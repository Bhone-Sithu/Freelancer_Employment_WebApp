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
import { post_project } from '../Components/Function/project_function';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


const theme = createTheme();

export default function Post_Project() {
    const [status, setStatus] = React.useState(0);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [skillset, setSkill] = React.useState([]);
    const [language, setLanguage] = React.useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        form.append('language', language)
        form.append('skillset', skillset)
        form.append('deadline', selectedDate)
        const status_code = await post_project(form);
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
            <div>
            <Container component="main" maxWidth="md" >
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
                        Post Project
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {status == 201 ? <Grid item xs={12}>
                                <Alert severity="success">Your Project post has been requested. Verifying is in progress.<br /> Please wait for an email for the admins' approval.</Alert>
                            </Grid> : null}


                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    id="description"
                                    label="Description"
                                    name="description"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="payment"
                                    label="Payment in Dollar($)"
                                    name="payment"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DesktopDatePicker

                                    label="Project Deadline"
                                    inputFormat="DD/MM/YYYY"
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
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
                            sx={{ mt: 3, mb: 2,backgroundColor:"#8f78ff" }}
                        >
                            Send Post Request
                        </Button>
                    </Box>
                </Box>
            </Container>
            </div>
        </ThemeProvider>
    );
}
