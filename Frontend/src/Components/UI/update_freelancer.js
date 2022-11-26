import * as React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Paper } from '@mui/material';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import axios from "axios"
import { freelancer_update } from '../Function/freelancer_function';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListSubheader from '@mui/material/ListSubheader';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
let countryList = require('../../country.js')


const theme = createTheme();

export default function Update_Freelancer() {
    const navigate = useNavigate();
    const { id } = useParams()
    let country_array = countryList.map((country) => {
        return <MenuItem value={country}>{country}</MenuItem>
    })
    const [first_time, setFirstTime] = React.useState(true);
    const [status, setStatus] = React.useState(0);
    const [reload, setReload] = React.useState(false);
    const [file, setFile] = React.useState();
    const [cv, setCV] = React.useState();
    const [preview, setPreview] = React.useState("");
    const [is_preview, setIsPreview] = React.useState(false);
    const [freelancer, setFreelancer] = React.useState({
        email: " ",
        password: " ",
        phone: " ",
        name: " ",
        country: " ",
        skillset: "",
        language: "",
        profile_photo: " ",
        cv: " ",
    });
    const [country, setCountry] = React.useState(0);
    const [error, setError] = React.useState({
        email: "",
        password: "",
        phone: "",
        name: "",
        country: "",
        skillset: "",
        language: "",
        profile_photo: "",
        cv: "",
    });

    const validation = async (data) => {
        let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        let temp = {
            email: "",
            password: "",
            phone: "",
            name: "",
            country: "",
            skillset: "",
            language: "",
            cv: "",
            profile_photo: "",
        }
        let error_free = true;
        console.log(data.get("skillset"))
        let res = await axios.post(process.env.REACT_APP_HOST + "api/freelancers/email_duplicate", { email: data.get("email"), id:freelancer._id })
        if (res.data.is_duplicate) { temp.email = "Email is already taken"; error_free = false }
        if (!data.get("email").match(pattern)) { temp.email = "Invalid Email"; error_free = false }
        if (data.get("password").trim() === "") { temp.password = "Password is Required!"; error_free = false }
        if (data.get("phone").trim() === "") { temp.phone = "Phone is Required!"; error_free = false }
        if (data.get("name").trim() === "") { temp.name = "name is Required!"; error_free = false }
        if (data.get("skillset").trim() === "") { temp.skillset = "Skillset is Required!"; error_free = false }
        if (data.get("language").trim() === "") { temp.language = "language is Required!"; error_free = false }
        if (data.get("country").trim() === "") { temp.country = "country is Required!"; error_free = false }
        setError(temp)
        return error_free;
    }
    const handleChange = async (event) => {
        let temp = freelancer
        let key = event.target.name
        let value = event.target.value
        if (key == "language" || key == "skillset") {

        }
        console.log(event.target)
        temp[key] = value

        setFreelancer(temp)

        setReload(!reload)
        if(value != "")
        {
            setError({
                ...error,
                [key] : ""
            })
        }

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append("file", file);
        data.append("file", cv);
        data.append("profile_photo", freelancer.profile_photo)
        data.append("cv", freelancer.cv)
        let validate_result = await validation(data)

        if (validate_result) {
            console.log(validate_result)
            const status_code = await freelancer_update(data, id);
            setStatus(status_code);
            navigate('../freelancer_list')
        }
    };
    useEffect(() => {
        if (file) {
            const file_reader = new FileReader();
            file_reader.onload = () => {
                setPreview(file_reader.result)
            };
            file_reader.readAsDataURL(file);
            setIsPreview(file.name.match(/\.(jpeg|jpg|png)$/));
        }
        if (first_time) {
            console.log("hi")
            axios.get(process.env.REACT_APP_HOST + `api/freelancers/get/${id}`)
                .then((response) => {
                    setFreelancer(response.data);

                })
                .catch((error) => {
                    console.log(error);
                })
            setFirstTime(false);
        }

    }, [reload])
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
                    <Typography component="h1" variant="h5">
                        Freelancer Update Form
                    </Typography>
                    {is_preview ?
                        <IconButton size="large" variant="contained" component="label">
                            <img src={preview} width={200} height={200} style={{ borderRadius: "50%" }} />
                            <EditIcon sx={{ position: 'absolute', color: "white", backgroundColor: "#8f78ff", borderRadius: 15, fontSize: 40, p: 0.5, bottom: 0, left: 20, top: "70%" }} />
                            <input type="file" onChange={(e) => {
                                setFile(e.target.files[0]);
                                setReload(!reload)
                            }} hidden />
                        </IconButton>
                        :
                        <IconButton size="large" variant="contained" component="label">
                            <img src={process.env.REACT_APP_HOST + "images/" + freelancer.profile_photo} width={200} height={200} style={{ borderRadius: "50%" }} />
                            <EditIcon sx={{ position: 'absolute', color: "white", backgroundColor: "#8f78ff", borderRadius: 15, fontSize: 40, p: 0.5, bottom: 0, left: 20, top: "70%" }} />
                            <input type="file" onChange={(e) => {
                                setFile(e.target.files[0]);
                                setReload(!reload)
                            }} hidden />
                        </IconButton>
                    }


                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {status === 201 ? <Grid item xs={12}>
                                <Alert severity="success">Updated Successfully</Alert>
                            </Grid> : null}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ backgroundColor: "white" }}
                                    onChange={handleChange}
                                    value={freelancer.email}
                                    variant="outlined"
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
                                    sx={{ backgroundColor: "white" }}
                                    onChange={handleChange}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={error.password === "" ? false : true}
                                    helperText={error.password}
                                    value={freelancer.password}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ backgroundColor: "white" }}
                                    onChange={handleChange}
                                    value={freelancer.phone}
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
                                    sx={{ backgroundColor: "white" }}
                                    onChange={handleChange}
                                    value={freelancer.name}
                                    fullWidth
                                    id="name"
                                    label="User Name"
                                    name="name"
                                    error={error.name === "" ? false : true}
                                    helperText={error.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <FormControl fullWidth error={error.country === "" ? false : true}>
                                    <InputLabel id="country">Country</InputLabel>
                                    <Select
                                        sx={{ backgroundColor: "white" }}
                                        labelId="country"
                                        id="country"
                                        label="Country"
                                        name="country"
                                        value={freelancer.country}
                                        onChange={handleChange}
                                    >
                                        {country_array}

                                    </Select>
                                    <FormHelperText>{error.country}</FormHelperText>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={error.language === "" ? false : true}>
                                    <InputLabel id="languages">Language</InputLabel>
                                    <Select
                                        labelId="languages"
                                        // sx={{backgroundColor:"white"}}
                                        id="language"
                                        name="language"
                                        multiple
                                        error={error.language === "" ? false : true}
                                        helperText={error.language}
                                        value={freelancer.language != "" ?
                                            freelancer.language[0].split(",").length > 1 ? freelancer.language[0].split(",")
                                                : freelancer.language
                                            : []}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {Array.isArray(selected) ? selected.map((value) => (
                                                    <Chip key={value} label={value} sx={{ backgroundColor: "white" }} />
                                                )) : null}
                                            </Box>
                                        )}
                                    >
                                        <MenuItem value="English">English</MenuItem>
                                        <MenuItem value="Myanmar">Myanmar</MenuItem>
                                        <MenuItem value="Japanese">Japanese</MenuItem>
                                        <MenuItem value="Chinese">Chinese</MenuItem>
                                        <MenuItem value="Korean">Korean</MenuItem>
                                        <MenuItem value="French">French</MenuItem>


                                    </Select>
                                    <FormHelperText>{error.language}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={error.skillset === "" ? false : true}>
                                    <InputLabel id="skillsets">Skills</InputLabel>
                                    <Select
                                        labelId="skillsets"
                                        id="skillset"
                                        name="skillset"
                                        multiple
                                        value={freelancer.skillset != "" ?
                                            freelancer.skillset[0].split(",").length > 1 ? freelancer.skillset[0].split(",")
                                                : freelancer.skillset
                                            : []}

                                        helperText={error.skillset}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {Array.isArray(selected) ? selected.map((value) => (
                                                    <Chip key={value} label={value} sx={{ backgroundColor: "white" }} />
                                                )) : null}
                                            </Box>
                                        )}
                                    >
                                        <ListSubheader>Software Engineering</ListSubheader>
                                        <MenuItem value="PHP">PHP</MenuItem>
                                        <MenuItem value="JavaScript">JavaScript</MenuItem>
                                        <MenuItem value="Java">Java</MenuItem>
                                        <MenuItem value="Kotlin">Kotlin</MenuItem>

                                        <ListSubheader>Business</ListSubheader>
                                        <MenuItem value="Business Analytic">Business Analytic</MenuItem>
                                        <MenuItem value="Marketing">Marketing</MenuItem>


                                    </Select>
                                    <FormHelperText>{error.skillset}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    cv ?
                                        <Grid container >
                                            <IconButton sx={{ mt: 2, color: "#8f78ff", mt: 0 }} size="large" variant="contained" component="label">
                                                <Paper elevation={3} sx={{ width: 'fit-content', px: 1, py: 1, backgroundColor: "#8f78ff", color: "white", borderRadius: "5px" }}>

                                                    <InsertDriveFileIcon sx={{ mt: "auto" }} />
                                                    <Typography variant="body2" sx={{}}>{cv.name}</Typography>


                                                    <input type="file" onChange={(e) => {
                                                        setCV(e.target.files[0]);
                                                    }} hidden />
                                                </Paper>
                                            </IconButton>
                                            <Typography sx={{ mt: "auto", mb: "auto", color: "#8f78ff" }}>Click the icon from the left to Update your CV</Typography>
                                        </Grid>
                                        :
                                        <Grid container>
                                            <IconButton sx={{ mt: 2, color: "#8f78ff", mt: 0 }} size="large" variant="contained" component="label">
                                                <Paper elevation={3} sx={{ width: 'fit-content', px: 1, py: 1, backgroundColor: "#8f78ff", color: "white", borderRadius: "5px" }}>

                                                    <InsertDriveFileIcon sx={{ mt: "auto" }} />
                                                    <Typography variant="body2" sx={{}}>{freelancer.cv}</Typography>


                                                    <input type="file" onChange={(e) => {
                                                        setCV(e.target.files[0]);
                                                    }} hidden />
                                                </Paper>
                                            </IconButton>
                                            <Typography sx={{ mt: "auto", mb: "auto", color: "#8f78ff" }}>Click the icon from the left to Update your CV</Typography>
                                        </Grid>
                                }

                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "#8f78ff" }}
                        >
                            Update
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
