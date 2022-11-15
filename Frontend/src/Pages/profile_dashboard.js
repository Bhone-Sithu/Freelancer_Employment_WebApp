import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from "axios";
import { Link as RouterLink, Router, Routes, Route, useParams, Link } from "react-router-dom"
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Paper, Rating, TextField } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ThreePIcon from '@mui/icons-material/ThreeP';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { update_dashboard } from '../Components/Function/dashboard_function'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Project_Card from "../Components/UI/project_card";
import FolderSpecial from '@mui/icons-material/FolderSpecial';

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
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};
export default function Admin_Dashboard() {


    const employer_id = localStorage.getItem("employer_id")
    const freelancer_id = localStorage.getItem("freelancer_id")
    const [user, setUser] = React.useState({ name: "aa" });
    const [projects, setProjects] = React.useState([]);
    const [rating, setRating] = React.useState([]);
    const { id } = useParams();
    const [open, setOpen] = React.useState(true);
    let effect_ran = false;
    const toggleDrawer = () => {
        setOpen(!open);
    };
    useEffect(() => {
        if (!effect_ran) {
            axios.get(process.env.REACT_APP_HOST + `api/employers/get/${id}`)
                .then(res => {
                    setUser(res.data)
                    axios.get(process.env.REACT_APP_HOST + `api/projects/employer_get_project/${id}`)
                        .then(res => {
                            setProjects(res.data)
                            res.data.map(project => {
                                if (project.dashboard_id != "") {
                                    axios.get(process.env.REACT_APP_HOST + `api/dashboards/get/${project.dashboard_id}`)
                                        .then(res => {
                                            res.data.employer_rating && setRating(original => [...original, res.data.employer_rating]);

                                        })
                                }

                            })
                        })
                })
                .catch((error) => {
                    console.log(error);
                })
            effect_ran = true;
        }

        // axios.get(process.env.REACT_APP_HOST + `api/freelancers/get/${id}`)
        //     .then(res => {
        //         setUser(res.data)
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })


    }, [])

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
                                color: "white",
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Grid container>

                            <Grid item xs={8}>
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    color="white"
                                    noWrap
                                    sx={{ flexGrow: 1 }}>
                                    {user && user.name}'s Profile
                                </Typography>
                            </Grid>

                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={{ backgroundColor: "#8f78ff" }}>
                    <div style={{ backgroundColor: "#8f78ff", height: "100%" }}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                color: "white",
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon sx={{ textDecoration: "none", color: "white" }} />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            <Link to={"/profile/" + id}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile Details" sx={{ textDecoration: "none", color: "white" }} />
                                </ListItemButton>
                            </Link>

                            {id == freelancer_id || employer_id ?
                                <Link to={"/profile/" + id + "/previous_projects"}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <FolderSpecial sx={{ textDecoration: "none", color: "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Previous Projects" sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemButton>
                                </Link>
                                : null}

                            <Link to="/project_feed">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ExitToAppIcon sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Back to Project Feed" sx={{ textDecoration: "none", color: "white" }} />
                                </ListItemButton>
                            </Link>


                        </List>
                    </div>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />

                    <Routes>

                        <Route path="" element={
                            <Grid xs={12} sx={{ backgroundColor: "#c7fdff", height: "100%" }}>
                                <Card sx={{ display: 'flex' }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h1" variant="h2">
                                            {user && user.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            email: {user && user.email}
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            phone number: {user && user.phone}
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            country : {user && user.country}
                                        </Typography>
                                        {user && user.role == "freelancer" ?
                                            <>
                                                <Typography variant="body1" paragraph>
                                                    Skillset : {user && user.skillset.join(" , ")}
                                                </Typography>
                                                <Typography variant="body1" paragraph>
                                                    Languages : {user && user.language.join(" , ")}

                                                </Typography>
                                            </> :
                                            <>
                                                <Typography variant="body1" paragraph>
                                                    Company : {user && user.company_name}
                                                </Typography>
                                                <Typography variant="body1" paragraph>
                                                    Company Size : {user && user.company_size}
                                                    {console.log(rating)}
                                                </Typography>
                                                <Typography variant="body1" paragraph>
                                                    Company_Address : {user && user.company_address}
                                                </Typography>
                                            </>}

                                    </CardContent>

                                </Card>
                                <br></br><br></br>
                                {rating.map(rate => (
                                    <Card>
                                        <CardContent>
                                            <Grid container>
                                                <Rating name="half-rating" sx={{ mt: 2 }}
                                                    value={rate.star}
                                                    precision={0.5} size="large"
                                                />
                                                <Typography variant="body1" sx={{ opacity: 0.6, ml: 2, mt: "auto" }}>{labels[rate.star]}</Typography>

                                            </Grid>
                                            <br></br>
                                            <Typography variant="body1">
                                                {rate.feedback}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}

                            </Grid>
                        } />
                        {id == employer_id || freelancer_id ?
                            <Route path="previous_projects" element={
                                <Grid container spacing={3}>
                                    {
                                        projects.map((project) => <Project_Card key={project._id} post={project} from="profile" />)
                                    }

                                </Grid>
                            } />
                            :
                            null}


                    </Routes>

                </Box>
            </Box >
        </ThemeProvider >

    );

}
