import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState, useLayoutEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { apply_project } from '../Components/Function/project_function'
import { Link as RouterLink, useNavigate } from "react-router-dom"
import Link from '@mui/material/Link';
import Nav from '../Components/UI/nav'
function FeaturedPost() {
    const { id } = useParams();
    const [project, setProject] = useState({ candidate: [] });
    const [status, setStatus] = useState(0);
    let navigate = useNavigate();
    const [freelancers, setFreelancers] = useState([]);
    const [freelancer, setFreelancer] = useState({
        name: ""
    });
    const [employer, setEmployer] = useState({});
    // let freelancers = []
    const freelancer_id = localStorage.getItem("freelancer_id");
    useEffect(() => {
        const get_projects = async () => {
            await axios.get(process.env.REACT_APP_HOST + `api/projects/get/${id}`)
                .then((response) => {
                    setProject(response.data);
                    axios.get(process.env.REACT_APP_HOST + `api/freelancers/get/${response.data.freelancer_id}`)
                        .then((res) => {

                            setFreelancer(res.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    axios.get(process.env.REACT_APP_HOST + `api/employers/get/${response.data.employer_id}`)
                        .then((res) => {
                            setEmployer(res.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .catch((error) => {
                    console.log(error);
                })

        }
        get_projects();
        console.log("hi")
    }, [])
    project.candidate.map((candidate) => {
        axios.get(process.env.REACT_APP_HOST + `api/freelancers/get/${candidate}`)
            .then((response) => {
                if (!freelancers.includes(response.data)) {
                    setFreelancers((prev) => [
                        ...prev,
                        response.data
                    ])

                }

            })
            .catch((error) => {
                console.log(error);
            })
    })
    const invite = async () => {
        localStorage.removeItem("project_id")
        localStorage.setItem("invite_id", id)
        navigate(`../../project_feed/freelancers_list/`)
    }
    const apply = async () => {
        const status = await apply_project(id, freelancer_id);
        console.log(status);
        setStatus(status);
    }
    const accept = async (fid) => {
        localStorage.removeItem("invite_id")
        localStorage.setItem("project_id", id)
        navigate(`/freelancer_view/${fid}`)
    }
    return (
        <div style={{ backgroundColor: "#c7fdff", paddingBottom:"10%" }}>
            <Nav />
            <Container component="main" maxWidth="lg" sx={{
                alignItems: 'center',
            }} >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <Card sx={{ display: 'flex' }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography component="h1" variant="h2">
                                        {project.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        deadline: {project.deadline}
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        {project.description}
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Required Skillset : {project.skillset}
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Preferred Languages : {project.language}
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Payment : {project.payment} $
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        The post is expired in {project.expire_date} days.
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Employer name : {employer.name}
                                    </Typography>
                                    {project.freelancer_id != "" ?
                                        <Typography variant="body1" paragraph>
                                            Freelancer name {freelancer.name}
                                        </Typography> : null}
                                    {localStorage.getItem("employer_id") ?
                                        <Typography variant="body1" paragraph>
                                            Admin id {project.admin_id}
                                        </Typography> : null}

                                </CardContent>

                            </Card>

                        </Grid>
                        <Grid item xs={12} md={3}>
                            {localStorage.getItem("employer_id") == project.employer_id ?
                                project.freelancer_id != "" ?
                                    <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
                                        <Alert severity="success"> You have successfully accepted {freelancer.name} for this project.</Alert>
                                    </Grid>
                                    :
                                    <Box sx={{ width: '100%' }}>
                                        <List>
                                            {
                                                project.candidate.map((freelancer, i) =>
                                                    <div>
                                                        <ListItem disablePadding>
                                                            {/* <Button component={RouterLink} to="/" color="inherit" sx={{ display: 'flex' }}> */}
                                                            <ListItemIcon>
                                                                <InboxIcon />
                                                            </ListItemIcon>
                                                            {freelancers[i] ?
                                                                <>
                                                                    <ListItemText primary={freelancers[i].name} />
                                                                    <Button

                                                                        onClick={() => accept(freelancers[i]._id)}
                                                                        variant="contained"
                                                                        sx={{ mt: 3, mb: 2 }}
                                                                    >
                                                                        View
                                                                    </Button>
                                                                </>
                                                                : null}

                                                            {/* </Button> */}


                                                        </ListItem>
                                                        <Divider />
                                                    </div>

                                                )
                                            }


                                        </List>

                                    </Box>
                                : null
                            }
                        </Grid>
                    </Grid>
                </Box>
                {localStorage.getItem("employer_id") == project.employer_id ?
                    project.freelancer_id == "" ? project.is_approved ?
                        <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
                            <Button
                                fullWidth
                                onClick={() => invite(project._id)}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Invite a Freelancer
                            </Button>
                        </Grid> : null : null
                    : null}
                {
                    project.dashboard_id !== "" ?
                        <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                            <Button
                                fullWidth
                                onClick={() => navigate(`../../project_dashboard/${project._id}`)}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Go to Project Dashboard
                            </Button>
                        </Grid> : null
                }
                {localStorage.getItem("freelancer_id") ?
                    status == "200" ?
                        <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
                            <Alert severity="success"> You have successfully applied for this project.</Alert>
                        </Grid> :
                        project.candidate.includes(freelancer_id) ?
                            <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
                                <Alert severity="error"> You have already applied for this project. Please wait for the email for acceptance.</Alert>
                            </Grid> :
                            <Button
                                fullWidth
                                onClick={() => apply()}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Apply
                            </Button>
                    : null
                }

            </Container>
        </div>
    );
}


export default FeaturedPost;