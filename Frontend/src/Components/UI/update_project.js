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
import { Chip, IconButton, ListSubheader, OutlinedInput } from '@mui/material';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import axios from "axios"
import { project_register, projects_get, project_update } from '../Function/project_function';
import { DesktopDatePicker } from '@mui/x-date-pickers';

let countryList = require('../../country.js')


const theme = createTheme();

export default function Update_project() {
    const navigate = useNavigate();
    const { id } = useParams()
    let country_array = countryList.map((country) => {
        return <MenuItem value={country}>{country}</MenuItem>
    })
    const [first_time, setFirstTime] = React.useState(true);
    const [status, setStatus] = React.useState(0);
    const [reload, setReload] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [project, setProject] = React.useState({
        title: " ",
        description: " ",
        payment: " ",
        deadline: " ",
        skillset: " ",
        language: " ",
    });
    const [country, setCountry] = React.useState(0);
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
    const handleChange = async (event) => {
        let temp = project
        let key = event.target.name
        let value = event.target.value
        console.log(event.target)
        temp[key] = value

        setProject(temp)
        setReload(!reload)

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let validate_result = await validation(data)

        if (validate_result) {
            console.log(validate_result)
            const status_code = await project_update(data, id);
            setStatus(status_code);
            navigate('../project_list')
        }


    };
    useEffect(() => {
        
        if (first_time) {
            console.log("hi")
            axios.get(process.env.REACT_APP_HOST + `api/projects/get/${id}`)
                .then((response) => {
                    setProject(response.data);

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
                        Project Update Form
                    </Typography>
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
                            value={project.title}
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
                            value={project.description}
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
                            value={project.payment}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DesktopDatePicker

                            label="Project Deadline"
                            inputFormat="DD/MM/YYYY"
                            value={project.deadline}
                            onChange={handleChange}

                            renderInput={(params) =>
                                <TextField fullWidth {...params} error={error.deadline === "" ? false : true} helperText={error.deadline} />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={error.language === "" ? false : true}>
                            <InputLabel id="languages">Language</InputLabel>
                            <Select
                                labelId="languages"
                                id="language"
                                multiple
                                value={project.language}
                                onChange={handleChange}
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
                                value={project.skillset}
                                onChange={handleChange}
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#8f78ff" }}
                    >
                        Update
                    </Button>
                </Box>
            </Container >
        </ThemeProvider >
    );
}
