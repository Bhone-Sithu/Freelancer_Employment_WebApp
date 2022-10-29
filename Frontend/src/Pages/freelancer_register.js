import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListSubheader from '@mui/material/ListSubheader';
import FormHelperText from '@mui/material/FormHelperText';
import { freelancer_register } from '../Components/Function/freelancer_function';
let countryList = require('../country.js')

const theme = createTheme();

export default function Freelancer_Register() {
    let country_array = countryList.map((country) => <MenuItem value={country}>{country}</MenuItem>)
    const [status, setStatus] = React.useState(0);
    const [error, setError] = React.useState({});
    const [skillset, setSkill] = React.useState([]);
    const [language, setLanguage] = React.useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        form.append('language', language)
        form.append('skillset', skillset)
        const status_code = await freelancer_register(form);
        setStatus(status_code);

    };

    const handleSkill = (event) => {
        setSkill(event.target.value);
        console.log(event.target.value);
    }
    const handleLanguage = (event) => {
        setLanguage(event.target.value);
        console.log(event.target.value);
    }
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
                        Freelancer Registration Form
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {status == 201 ? <Grid item xs={12}>
                                <Alert severity="success">Your Registration is completed and background checking is in progress.<br /> Please wait for an email for the admins' approval.</Alert>
                            </Grid> : null}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="User Name"
                                    name="name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>

                                <FormControl fullWidth error={error.country === "" ? false : false}>
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
                            
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="languages">Language</InputLabel>
                                    <Select
                                        labelId="languages"
                                        id="language"
                                        multiple
                                        value={language}
                                        onChange={handleLanguage}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="skillsets">Skills</InputLabel>
                                    <Select
                                        labelId="skillsets"
                                        id="skillset"
                                        multiple
                                        value={skillset}
                                        onChange={handleSkill}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
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
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2,backgroundColor:"#886fff" }}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" sx={{textDecoration:"none"}}>
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
