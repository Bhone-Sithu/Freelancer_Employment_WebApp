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
import Chat from "../Components/UI/chat"
import Chat_Admin from "../Components/UI/chat_admin"
import Rating from '../Components/UI/rating';
import { Link as RouterLink, Router, Routes, Route, useParams, Link } from "react-router-dom"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ThreePIcon from '@mui/icons-material/ThreeP';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { update_dashboard } from '../Components/Function/dashboard_function'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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
    const [projects, setProjects] = React.useState({});
    const [dashboard, setDashboard] = React.useState({ requirement: "" });
    const [dialog, setDialog] = React.useState({ open: false });
    const { id } = useParams();
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const onCancel = () => {
        setDialog({ open: false });
        console.log(dialog);
    }
    const onPerform = (form_data) => {
        console.log(dialog);
        update_dashboard(dialog.title, form_data, dashboard)
        setDialog({ open: false });
    }
    useEffect(() => {
        axios.get(process.env.REACT_APP_HOST + `api/projects/get/${id}`)
            .then((response) => {
                setProjects(response.data);
                axios.get(process.env.REACT_APP_HOST + `api/dashboards/get/${response.data.dashboard_id}`)
                    .then((res) => {
                        setDashboard(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })

    }, [dialog])

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
                                    {projects.title} Dashboard {dashboard.is_complete ?
                                        <Typography
                                            component="h1"
                                            variant="body1"
                                            color="#69ff8e"
                                            noWrap
                                            sx={{ flexGrow: 1 }}
                                        >Completed</Typography> :
                                        <Typography
                                            component="h1"
                                            variant="body1"
                                            color="#c7fdff"
                                            noWrap
                                            sx={{ flexGrow: 1 }}
                                        >Ongoing</Typography>}
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
                            <Link to={"/project_dashboard/" + projects._id}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Project Dashboard" sx={{ textDecoration: "none", color: "white" }} />
                                </ListItemButton>
                            </Link>
                            {localStorage.getItem("admin_id") ?
                                <>
                                    <Link to={"/project_dashboard/" + projects._id + "/chat_monitor"}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <ThreePIcon sx={{ textDecoration: "none", color: "white" }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Monitor Chat" sx={{ textDecoration: "none", color: "white" }} />
                                        </ListItemButton>
                                    </Link>
                                    <Link to={"/project_dashboard/" + projects._id + "/chat_employer"}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <QuestionAnswerIcon sx={{ textDecoration: "none", color: "white" }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Chat with Employer" sx={{ textDecoration: "none", color: "white" }} />
                                        </ListItemButton>
                                    </Link>
                                    <Link to={"/project_dashboard/" + projects._id + "/chat_freelancer"}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <QuestionAnswerIcon sx={{ textDecoration: "none", color: "white" }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Chat with Freelancer" sx={{ textDecoration: "none", color: "white" }} />
                                        </ListItemButton>
                                    </Link>
                                </>
                                :
                                <>

                                    <Link to={"/project_dashboard/" + projects._id + "/chat"}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <QuestionAnswerIcon sx={{ textDecoration: "none", color: "white" }} />
                                            </ListItemIcon>
                                            {localStorage.getItem("employer_id") ?
                                                <ListItemText primary="Chat with Freelancer" sx={{ textDecoration: "none", color: "white" }} />
                                                :
                                                <ListItemText primary="Chat with Employer" sx={{ textDecoration: "none", color: "white" }} />}

                                        </ListItemButton>
                                    </Link>
                                    <Link to={"/project_dashboard/" + projects._id + "/chat_admin"}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <ThreePIcon sx={{ textDecoration: "none", color: "white" }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Chat with Admin" sx={{ textDecoration: "none", color: "white" }} />
                                        </ListItemButton>
                                    </Link>
                                </>
                            }

                            <Link to={"/project_dashboard/" + projects._id + "/rating"}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ReviewsIcon sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemIcon>
                                    {localStorage.getItem("employer_id") ?
                                        <ListItemText primary="Rate Freelancer" sx={{ textDecoration: "none", color: "white" }} />
                                        :
                                        <ListItemText primary="Rate Employer" sx={{ textDecoration: "none", color: "white" }} />}
                                </ListItemButton>
                            </Link>

                            {localStorage.getItem("admin_id") ?
                                <Link to="/admin_dashboard">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ExitToAppIcon sx={{ textDecoration: "none", color: "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Back to Admin Dashboard" sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemButton>
                                </Link>
                                :
                                <Link to="/project_feed">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ExitToAppIcon sx={{ textDecoration: "none", color: "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Back to Project Feed" sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemButton>
                                </Link>
                            }

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
                            <div style={{ padding: 50, height: "100%", backgroundColor: "#c7fdff", width: "100%" }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                                            <Box sx={{ width: '100%', mr: 1, color: "#8f78ff" }}>
                                                <LinearProgress variant="determinate" color="inherit" sx={{ backgroundColor: "white", height: "15px", borderRadius: "4px" }} value={dashboard.progress} />
                                            </Box>
                                            <Box sx={{ width: "15%" }}>
                                                <Typography variant="h6" color="#8f78ff">{dashboard.progress}% (v{dashboard.version})</Typography>
                                            </Box>
                                        </Box>

                                    </Grid>
                                    <Grid item xs={12}>
                                        {localStorage.getItem("freelancer_id") ?
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }}
                                                onClick={() => {
                                                    setDialog({
                                                        title: "Update Progress",
                                                        content: "Update the Project's Progress percentage and version number.",
                                                        open: true,
                                                        original_text: dashboard.version,
                                                    })
                                                }}>Update progress bar and version</Button>
                                            :
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }} disabled>Update progress bar and version</Button>
                                        }

                                    </Grid>
                                    <Grid item xs={12} >
                                        <Paper style={{ height: "200px" }}>
                                            <Typography
                                                component="h1"
                                                variant="body1"
                                                color="black"
                                                noWrap
                                                sx={{ flexGrow: 1 }}
                                            >{dashboard.requirement.split("\n").map(val => (
                                                <>
                                                    {val}
                                                    <br />
                                                </>
                                            ))}</Typography>
                                        </Paper>

                                    </Grid>
                                    <Grid item xs={12} >
                                        {localStorage.getItem("employer_id") ?
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }}
                                                onClick={() => {
                                                    setDialog({
                                                        title: "Update Requirement",
                                                        content: "Update the requirement list. Please press 'Enter' after each list for clearer demonstration for the Freelancer",
                                                        open: true,
                                                        original_text: dashboard.requirement,
                                                        onPerform: onPerform
                                                    })
                                                }}>Update Requirement List</Button>
                                            :
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }} disabled>Update Requirement List</Button>
                                        }
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Paper style={{ height: "80px" }}>{dashboard.project_demo}</Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper style={{ height: "80px" }}>{dashboard.project_file}</Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {localStorage.getItem("freelancer_id") ?
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }}
                                                onClick={() => {
                                                    setDialog({
                                                        title: "Edit Demo",
                                                        content: "Update the project demonstration URL that you hosted online.",
                                                        open: true,
                                                        original_text: dashboard.project_demo,
                                                        onPerform: onPerform
                                                    })
                                                }}>Edit Demo Link</Button>
                                            :
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }} disabled>Edit Demo Link</Button>
                                        }
                                    </Grid>
                                    <Grid item xs={6}>
                                        {localStorage.getItem("freelancer_id") ?
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }}
                                                onClick={() => {
                                                    setDialog({
                                                        title: "Upload File",
                                                        content: "Upload the project file of the latest version",
                                                        open: true,
                                                        original_text: "",
                                                        onPerform: onPerform
                                                    })
                                                }} >Upload Project File</Button>
                                            :
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }} disabled>Upload Project File</Button>
                                        }

                                    </Grid>
                                    <Grid item xs={12} >
                                        {localStorage.getItem("employer_id") ?
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }} >Set Project as complete</Button>
                                            :
                                            <Button variant="contained" fullWidth sx={{ height: "50px", backgroundColor: "#8f78ff", color: "white" }} disabled>Set Project as complete</Button>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        } />
                        <Route path='chat' element={<Chat project={projects} />} />
                        <Route path='chat_admin' element={<Chat_Admin project={projects} role="admin" />} />
                        <Route path='chat_freelancer' element={<Chat_Admin project={projects} role="freelancer" />} />
                        <Route path='chat_employer' element={<Chat_Admin project={projects} role="employer" />} />
                        <Route path='chat_monitor' element={<Chat_Admin project={projects} role="monitor" />} />
                        <Route path='rating' element={<Rating dashboard={dashboard} />} />


                    </Routes>

                </Box>
            </Box >
            <FormDialog title={dialog.title} content={dialog.content}
                open={dialog.open} onCancel={onCancel} onPerform={onPerform} original_text={dialog.original_text} />
        </ThemeProvider >

    );

}

export function FormDialog(props) {
    const { title, content, open, onCancel, onPerform, original_text } = props;
    const [text, setText] = useState("");
    const [progress, setProgress] = useState(0);
    useEffect(() => {


    }, [])
    const onSubmit = () => {
        const form_data = {
            text,
            progress
        }
        onPerform(form_data);
        setText("");
    }
    return (

        <Dialog open={open} onClose={onCancel} >
            <div style={{ padding: 20 }}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                    <br></br>
                    {title === "Update Requirement" ?
                        <TextField

                            autoFocus
                            multiline
                            fullWidth
                            value={text == "" ? original_text : text}
                            onChange={(event) => setText(event.target.value)}
                            id="requirement"
                            label="Requirement List"
                            type="text"
                            rows={4}
                            variant="outlined"
                        /> : null}
                    {title == "Update Progress" ?
                        <>
                            <TextField
                                autoFocus
                                fullWidth
                                value={progress}
                                onChange={(event) => setProgress(event.target.value)}
                                id="progress"
                                label="Progress Percentage"
                                type="number"
                                variant="outlined"
                            />
                            <br></br>
                            <br></br>
                            <TextField
                                autoFocus
                                fullWidth
                                value={text == "" ? original_text : text}
                                onChange={(event) => setText(event.target.value)}
                                id="version"
                                label="Version Number"
                                type="text"
                                variant="outlined"
                            />
                        </>
                        : null
                    }
                    {title === "Edit Demo" ?
                        <TextField
                            autoFocus
                            fullWidth
                            value={text == "" ? original_text : text}
                            onChange={(event) => setText(event.target.value)}
                            id="demo"
                            label="Demo URL"
                            type="text"
                            variant="outlined"
                        /> : null}

                    {title === "Upload File" ?
                        <TextField
                            autoFocus
                            fullWidth
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            id="file"
                            label="Project File"
                            type="file"
                            variant="outlined"
                        /> : null}


                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onSubmit}>{title}</Button>
                </DialogActions>
            </div>
        </Dialog>

    );
}

