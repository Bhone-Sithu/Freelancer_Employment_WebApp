import * as React from 'react';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Employer_List from "../Components/UI/employer_list";
import Unapproved_Employer from "../Components/UI/unapproved_employer";
import Unapproved_Freelancer from "../Components/UI/unapproved_freelancer";
import Freelancer_List from "../Components/UI/freelancer_list";
import Project_List from "../Components/UI/project_list";
import Unapproved_Project from "../Components/UI/unapproved_project";
import Update_Employer from "../Components/UI/update_employer";
import Update_Freelancer from "../Components/UI/update_freelancer";
import Update_Project from "../Components/UI/update_project";
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import Payment from "../Pages/payment";
import Dashboard from '../Components/UI/admin_dashboard';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import PaidIcon from '@mui/icons-material/Paid';

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
    
    const toggleDrawer = () => {
        setOpen(!open);
    };
    
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' , backgroundColor:"#c7fdff" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ backgroundColor: "#8f78ff"}}  >
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
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
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
                        <List component="nav" >
                            <Link to="/admin_dashboard" sx={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" color='white' sx={{ textDecoration: "none", color: "white" }} />
                                </ListItemButton>
                            </Link>
                            <Divider />
                            <ListSubheader component="div" inset sx={{ backgroundColor: "#8f78ff", color: "#7cfaff" }}>
                                Account Management
                            </ListSubheader>
                            <Link to="/admin_dashboard/employer_List " sx={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <BadgeIcon sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Employer_List" sx={{ textDecoration: "none", color: "white" }}/>
                                </ListItemButton>
                            </Link>

                            <Link to="/admin_dashboard/freelancer_List " sx={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <GroupIcon sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Freelancer_List" sx={{ textDecoration: "none", color: "white" }}/>
                                </ListItemButton>
                            </Link>

                            <Link to="/admin_dashboard/unapproved_employers " sx={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton>

                                    <ListItemIcon>
                                        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                                            <Box gridColumn="1/1" gridRow="1/1">
                                                <BadgeIcon sx={{ textDecoration: "none", color: "white" }} />
                                            </Box>
                                            <Box gridColumn="1/1" gridRow="1/1">
                                                <CloseIcon sx={{ textDecoration: "none", color: "red" }} ></CloseIcon>
                                            </Box>
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText primary="Unapproved Employer" sx={{ textDecoration: "none", color: "white" }}/>
                                </ListItemButton>
                            </Link>
                            <Link to="/admin_dashboard/unapproved_freelancers " sx={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                                            <Box gridColumn="1/1" gridRow="1/1">
                                                <GroupIcon sx={{ textDecoration: "none", color: "white" }} />
                                            </Box>
                                            <Box gridColumn="1/1" gridRow="1/1">
                                                <CloseIcon sx={{ textDecoration: "none", color: "red" }} ></CloseIcon>
                                            </Box>
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText primary="Unapproved Freelancers" sx={{ textDecoration: "none", color: "white" }}/>
                                </ListItemButton>
                            </Link>
                            <Divider />
                            <ListSubheader component="div" inset sx={{ backgroundColor: "#8f78ff", color: "#7cfaff" }}>
                                Project Data Management
                            </ListSubheader>
                            <Link to="/admin_dashboard/unapproved_projects " sx={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                    <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                                            <Box gridColumn="1/1" gridRow="1/1">
                                                <FolderSpecialIcon sx={{ textDecoration: "none", color: "white" }} />
                                            </Box>
                                            <Box gridColumn="1/1" gridRow="1/1">
                                                <CloseIcon sx={{ textDecoration: "none", color: "red" }} ></CloseIcon>
                                            </Box>
                                        </Box>
                                    </ListItemIcon>
                                    <ListItemText primary="Unapproved Projects" sx={{ textDecoration: "none", color: "white" }}/>
                                </ListItemButton>
                            </Link>
                            <Link to="/admin_dashboard/project_list " sx={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FolderSpecialIcon sx={{ textDecoration: "none", color: "white" }} />

                                    </ListItemIcon>
                                    <ListItemText primary="Project List" sx={{ textDecoration: "none", color: "white" }}/>
                                </ListItemButton>
                            </Link>
                            <Divider />
                            <ListSubheader component="div" inset sx={{ backgroundColor: "#8f78ff", color: "#7cfaff" }}>
                                Payment
                            </ListSubheader>
                            <Link to={"/admin_dashboard/payment/" + localStorage.getItem("admin_id")} sx={{ textDecoration: "none", color: "white" }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PaidIcon sx={{ textDecoration: "none", color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Payment" sx={{ textDecoration: "none", color: "white" }}/>
                                </ListItemButton>
                            </Link>
                        </List>
                    </div>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor:"#c7fdff",
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Routes>
                                <Route path='' element={<Dashboard/>} />
                                <Route path='employer_list' element={<Employer_List />} />
                                <Route path='update_employer/:id' element={<Update_Employer />} />
                                <Route path='unapproved_employers' element={<Unapproved_Employer />} />
                                <Route path='unapproved_freelancers' element={<Unapproved_Freelancer />} />
                                <Route path='unapproved_projects' element={< Unapproved_Project />} />
                                <Route path='freelancer_list' element={<Freelancer_List />} />
                                <Route path='update_freelancer/:id' element={<Update_Freelancer />} />
                                <Route path='project_list' element={<Project_List />} />
                                <Route path='update_project/:id' element={<Update_Project />} />
                                <Route path='payment/:id'element={<Payment />} />
                                
                            </Routes>

                        </Grid>
                    </Container>
                </Box>
            </Box >
        </ThemeProvider >
    );
}

