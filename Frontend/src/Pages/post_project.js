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
import { FormHelperText } from '@mui/material';
import Nav from '../Components/UI/nav'

const theme = createTheme();

export default function Post_Project() {
    const [status, setStatus] = React.useState(0);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [skillset, setSkill] = React.useState([]);
    const [language, setLanguage] = React.useState([]);
    const [error, setError] = React.useState({
        title: "",
        description: "",
        payment: "",
        deadline: "",
        skillset: "",
        language: "",
    });
    const validation = async (data) => {
        let temp = {
            title: "",
            description: "",
            payment: "",
            deadline: "",
            skillset: "",
            language: "",
        }
        let error_free = true;
        console.log(data.get("deadline"))
        if (data.get("title").trim() === "") { temp.title = "title is Required!"; error_free = false }
        if (data.get("description").trim() === "") { temp.description = "description is Required!"; error_free = false }
        if (data.get("payment").trim() === "") { temp.payment = "payment is Required!"; error_free = false }
        if (data.get("deadline").trim() === "null") { temp.deadline = "deadline is Required!"; error_free = false }
        if (data.get("skillset").trim() === "") { temp.skillset = "Skillset is Required!"; error_free = false }
        if (data.get("language").trim() === "") { temp.language = "language is Required!"; error_free = false }
        setError(temp)
        return error_free;
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        form.append('language', language)
        form.append('skillset', skillset)
        form.append('deadline', selectedDate)
        let validate_result = await validation(form)
        setStatus(0);
        if (validate_result) {
            const status_code = await post_project(form);
            setStatus(status_code);
        }

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
                <Nav/>
                <Container component="main" maxWidth="md" sx={{mb:5,mt:0}}>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
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
                                        error={error.title === "" ? false : true}
                                        helperText={error.title}
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
                                        error={error.description === "" ? false : true}
                                        helperText={error.description}
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
                                        error={error.payment === "" ? false : true}
                                        helperText={error.payment}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DesktopDatePicker

                                        label="Project Deadline"
                                        inputFormat="DD/MM/YYYY"
                                        value={selectedDate}
                                        onChange={setSelectedDate}

                                        renderInput={(params) =>
                                            <TextField fullWidth {...params} error={error.deadline === "" ? false : true}  helperText={error.deadline} />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={error.language === "" ? false : true}>
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
                                        <FormHelperText>{error.language}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={error.skillset === "" ? false : true}>
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
                                        <FormHelperText>{error.skillset}</FormHelperText>
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: "#8f78ff" }}
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
