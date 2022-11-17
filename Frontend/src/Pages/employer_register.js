import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import { CountryDropdown } from 'react-country-region-selector';
import axios from "axios"
import { employer_register, employers_get } from '../Components/Function/employer_function';
import { IconButton } from '@mui/material';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
let countryList = require('../country.js')


const theme = createTheme();

export default function Employer_Register() {
  let country_array = countryList.map((country) => <MenuItem value={country}>{country}</MenuItem>)
  const [status, setStatus] = React.useState(0);
  const [country, setCountry] = React.useState(0);
  const [file, setFile] = React.useState();
  const [preview, setPreview] = React.useState("");
  const [is_preview, setIsPreview] = React.useState(false);
  const [error, setError] = React.useState({
    email: "",
    password: "",
    phone: "",
    name: "",
    country: "",
    company_name: "",
    company_size: "",
    company_address: "",
    company_industry: "",
  });

  React.useEffect(() => {
    if (file) {
      const file_reader = new FileReader();
      file_reader.onload = () => {
        setPreview(file_reader.result)
      };
      file_reader.readAsDataURL(file);
      setIsPreview(file.name.match(/\.(jpeg|jpg|png)$/));
    }
  }, [file])

  const validation = async (data) => {
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let temp = {
      email: "",
      password: "",
      phone: "",
      name: "",
      country: "",
      company_name: "",
      company_size: "",
      company_address: "",
      company_industry: "",
      profile_photo: "",
    }
    let error_free = true
    let res = await axios.post(process.env.REACT_APP_HOST + "api/employers/email_duplicate", { email: data.get("email") })
    if (res.data.is_duplicate) { temp.email = "Email is already taken"; error_free = false }
    if (!data.get("email").match(pattern)) { temp.email = "Invalid Email"; error_free = false }
    if (data.get("password").trim() === "") { temp.password = "Password is Required!"; error_free = false }
    if (data.get("phone").trim() === "") { temp.phone = "Phone is Required!"; error_free = false }
    if (data.get("name").trim() === "") { temp.name = "name is Required!"; error_free = false }
    if (data.get("company_name").trim() === "") { temp.company_name = "company_name is Required!"; error_free = false }
    if (data.get("company_size").trim() === "") { temp.company_size = "company_size is Required!"; error_free = false }
    if (data.get("company_address").trim() === "") { temp.company_address = "company_address is Required!"; error_free = false }
    if (data.get("country").trim() === "") { temp.country = "country is Required!"; error_free = false }
    if (data.get("company_industry").trim() === "") { temp.company_industry = "company_industry is Required!"; error_free = false }
    if (!data.get("file")) { temp.profile_photo = "Profile photo is required"; error_free = false;}
    setError(temp)
    return error_free;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append('file', file)
    let validate_result = await validation(data)
    setStatus(0);
    if (validate_result) {
      
      const status_code = await employer_register(data);
      setStatus(status_code);
    }


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src='Lancer_logo.png' width={200} height={200} style={{ borderRadius: "50%" }} />
          <br></br>
          <Typography component="h1" variant="h5">
            Employer Registration Form
          </Typography>
          {is_preview ?
            <IconButton size="large" variant="contained" component="label">
              <img src={preview} width={200} height={200} style={{ borderRadius: "50%" }} />
              <EditIcon sx={{ position: 'absolute', color: "white", backgroundColor: "#8f78ff", borderRadius: 15, fontSize: 40, p: 0.5, bottom: 0, left: 20, top: "70%" }} />
              <input type="file" onChange={(e) => {
                setFile(e.target.files[0]);
              }} hidden />
            </IconButton>
            :
            <>
              <IconButton sx={{ mt: 2, color: "#8f78ff", mt: 0 }} size="large" variant="contained" component="label">

                <InsertDriveFile sx={{ fontSize: 40, mt: 0 }} />
                <Typography>Click to Upload Profile Picture</Typography>
                <input type="file" onChange={(e) => {
                  setFile(e.target.files[0]);
                }} hidden />
              </IconButton>
              {error.profile_photo === "" ? null :
                <Typography variant="body1" color={"red"}>{error.profile_photo}</Typography>}
            </>

          }

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {status === 201 ? <Grid item xs={12}>
                <Alert severity="success">Your Registration is completed and background checking is in progress.<br /> Please wait for an email for the admins' approval.</Alert>
              </Grid> : null}
              <Grid item xs={12} sm={6}>
                <TextField

                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={error.email === "" ? false : true}
                  helperText={error.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={error.password === "" ? false : true}
                  helperText={error.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  error={error.phone === "" ? false : true}
                  helperText={error.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  fullWidth
                  id="name"
                  label="User Name"
                  name="name"
                  error={error.name === "" ? false : true}
                  helperText={error.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <TextField

                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                /> */}
                <FormControl fullWidth error={error.country === "" ? false : true}>
                  <InputLabel id="country">Country</InputLabel>
                  <Select
                    labelId="country"
                    id="country"
                    label="Country"
                    name="country"
                  >
                    {country_array}

                  </Select>
                  <FormHelperText>{error.country}</FormHelperText>
                </FormControl>

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  fullWidth
                  id="company_name"
                  label="Company Name"
                  name="company_name"
                  error={error.company_name === "" ? false : true}
                  helperText={error.company_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField

                  fullWidth
                  id="company_size"
                  label="Company Size"
                  name="company_size"
                  error={error.company_size === "" ? false : true}
                  helperText={error.company_size}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={error.company_industry === "" ? false : true}>
                  <InputLabel id="industry">Company Industry</InputLabel>
                  <Select
                    labelId="industry"
                    id="company_industry"
                    label="Company Industry"
                    name="company_industry"
                  >
                    <MenuItem value={"Web and Mobile Software"}>Web and Mobile Software</MenuItem>
                    <MenuItem value={"Business"}>Business</MenuItem>
                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                  </Select>
                  <FormHelperText>{error.company_industry}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  multiline
                  id="company_address"
                  label="Company Address"
                  name="company_address"
                  error={error.company_address === "" ? false : true}
                  helperText={error.company_address}
                />
              </Grid>


            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#886fff" }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
