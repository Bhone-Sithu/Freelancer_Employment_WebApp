import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Project_Card from "../Components/UI/project_card";
import Freelancer_Card from "../Components/UI/freelancer_card";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Project_Detail from "./project_detail";
import { Link as RouterLink, Router, Routes, Route, useNavigate, useParams } from "react-router-dom"
import Link from '@mui/material/Link';
import NavBar from '../Components/UI/nav'
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import PaidIcon from '@mui/icons-material/Paid';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Chip, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';

const drawerWidth = 340;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

export default function Admin_Dashboard() {
    const [open, setOpen] = React.useState(true);
    const [projects, setProjects] = React.useState([]);
    const [my_projects, setMyProjects] = React.useState([]);
    const [freelancers, setFreelancers] = React.useState([]);
    const [freelancer, setFreelancer] = React.useState({ invitations: [] });
    const [invitation, setInvitation] = React.useState([]);
    const [skillset, setSkillset] = React.useState("");
    const [language, setLanguage] = React.useState("");
    const [search_freelancer, setSearch_Freelancer] = React.useState("");
    const [reload, setReload] = React.useState(false);
    const param = useParams();
    const freelancer_id = localStorage.getItem("freelancer_id");
    const freelancer_search = (text) => {
        axios.post(process.env.REACT_APP_HOST + "api/freelancers/search", { name: text })
            .then((response) => {
                setFreelancers(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const search = (e) => {
        setSearch_Freelancer(e.target.value);
        if (param["*"] == "freelancers_list/") { 
            axios.post(process.env.REACT_APP_HOST + "api/freelancers/search", { name: e.target.value })
                .then((response) => {
                    
                    setFreelancers(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else if (param["*"] == "") {
            axios.post(process.env.REACT_APP_HOST + "api/projects/search", { name: e.target.value })
                .then((response) => {
                    setProjects(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }
    const filter = () => {
        const req = {
            skillset,
            language
        }
        if (param["*"] == "")
            axios.post(process.env.REACT_APP_HOST + "api/projects/filter", req)
                .then((response) => {
                    setProjects(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        else if (param["*"] == "freelancers_list")
            axios.post(process.env.REACT_APP_HOST + "api/freelancers/filter", req)
                .then((response) => {
                    console.log(response.data)
                    setFreelancers(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
    }
    useEffect(() => {
        axios.get(process.env.REACT_APP_HOST + "api/projects/get")
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        if (localStorage.getItem("employer_id")) {
            axios.get(process.env.REACT_APP_HOST + `api/projects/employer_get_project/${localStorage.getItem("employer_id")}`)
                .then((response) => {
                    setMyProjects(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
            axios.get(process.env.REACT_APP_HOST + `api/freelancers/get`)
                .then((response) => {
                    setFreelancers(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if (localStorage.getItem("freelancer_id")) {
            axios.get(process.env.REACT_APP_HOST + `api/projects/freelancer_get_project/${localStorage.getItem("freelancer_id")}`)
                .then((response) => {
                    setMyProjects(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
            axios.get(process.env.REACT_APP_HOST + `api/freelancers/get/${freelancer_id}`)
                .then((response) => {
                    setFreelancer(response.data);

                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [reload])
    freelancer.invitations.map((project_id) => {
        axios.get(process.env.REACT_APP_HOST + `api/projects/get/${project_id}`)
            .then((response) => {
                setInvitation((prev) => [
                    ...prev,
                    response.data
                ])


            })
    })
    const effect_function = async () => {

    }
    // for (let index = 0; index < freelancer.invitations.length; index++) {
    //     axios.get(process.env.REACT_APP_HOST + `api/projects/get/${freelancer.invitations[index]}`)
    //     .then((response) => {
    //         setInvitation((prev) => [
    //             ...prev,
    //             response.data
    //         ])
    //     })
    // }


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ backgroundColor: "#8f78ff" }}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <NavBar />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={{ backgroundColor: "#8f78ff" }}>
                    <div style={{ backgroundColor: "#8f78ff", height: "100%" }}
                    >
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon sx={{ textDecoration: "none", color: "white" }} />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <Grid container>
                            <FormControl fullWidth sx={{ m: 2 }}>
                                <InputLabel id="languages">Language</InputLabel>
                                <Select
                                    sx={{ backgroundColor: "white", borderColor: "#cf7dff" ,overflow:"hidden"  }}
                                    labelId="languages"
                                    id="language"
                                    value={language}
                                    onChange={(e) => { setLanguage(e.target.value) }}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}

                                >
                                    <MenuItem value="English">English</MenuItem>
                                    <MenuItem value="Myanmar">Myanmar</MenuItem>
                                    <MenuItem value="Japanese">Japanese</MenuItem>
                                    <MenuItem value="Chinese">Chinese</MenuItem>
                                    <MenuItem value="Korean">Korean</MenuItem>
                                    <MenuItem value="French">French</MenuItem>


                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 2 }}>
                                <InputLabel id="skillsets">Skills</InputLabel>
                                <Select
                                    sx={{ backgroundColor: "white",overflow:"hidden" }}
                                    labelId="skillsets"
                                    id="skillset"
                                    value={skillset}
                                    onChange={(e) => { setSkillset(e.target.value) }}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}

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
                            <ListItemButton onClick={filter} sx={{width:"100%", mb:5,mt:3, backgroundColor: "#c7fdff", color: "black" }}>
                                <ListItemIcon>
                                    <FilterAltIcon sx={{ textDecoration: "none", color: "black" }} />

                                </ListItemIcon>

                                <ListItemText primary="Filter" sx={{ textDecoration: "none", color: "black" }} />
                            </ListItemButton>
                            <ListItemButton onClick={() => {
                                setSkillset("");
                                setLanguage("");
                                setReload(!reload)
                            }} sx={{width:"100%", backgroundColor: "#ff4f58", color: "white" }}>
                                <ListItemIcon>
                                    <HighlightOffIcon sx={{ textDecoration: "none", color: "white" }} />

                                </ListItemIcon>

                                <ListItemText primary="Clear Filter" sx={{ textDecoration: "none", color: "white" }} />
                            </ListItemButton>
                            
                        </Grid>
                    </div>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: "#c7fdff",
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>

                        <TextField
                            sx={{
                                mb: 4,
                                mt: 5,
                                backgroundColor: "white"
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#8f78ff" }} /></InputAdornment>,
                            }}
                            label="Search by Name"
                            fullWidth value={search_freelancer} onChange={search} />
                        <Routes>

                            <Route path="my_projects" element={
                                <Grid container spacing={3}>
                                    {
                                        my_projects.map((project) => <Project_Card key={project._id} post={project} />)
                                    }

                                </Grid>
                            } />
                            <Route path="" element={
                                <>
                                    <Typography variant="body2" sx={{ fontSize: 30, ml: 3 }}>{projects.length} Projects found</Typography>
                                    <Grid container spacing={3}>
                                        {
                                            projects.map((project) => <Project_Card key={project._id} post={project} />)
                                        }

                                    </Grid>
                                </>
                            } />
                            <Route path="freelancers_list" element={
                                <Grid container spacing={3}>

                                    <Typography variant="body2" sx={{ fontSize: 30, ml: 3 }}>{freelancers.length} Freelancers found</Typography>
                                    {
                                        freelancers.map((project) => <Freelancer_Card key={project._id} post={project} />)
                                    }

                                </Grid>
                            } />
                            <Route path="project_invitations" element={
                                <Grid container spacing={3}>

                                    {
                                        freelancer.invitations.map((project, i) => invitation[i] ?
                                            <Project_Card key={invitation[i]._id} post={invitation[i]} />
                                            :
                                            null)
                                    }

                                </Grid>
                            } />
                            <Route path="payment" element={
                                <Grid container spacing={3}>


                                </Grid>
                            } />

                        </Routes>

                    </Container>
                </Box>
            </Box >
        </ThemeProvider >
    );
}

