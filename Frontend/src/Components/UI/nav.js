import { Grid } from "@mui/material";
import { Link as RouterLink, Router, Routes, Route } from "react-router-dom";
import Link from '@mui/material/Link';
import Profile_Nav from './profile_nav'
const Nav = () => {
    return (
        <Grid container sx={{ backgroundColor: "#8f78ff" }}>


            <Grid item xs={12} lg={2} sx={{mb:2}} >
                <center>
                    <RouterLink to="/project_feed" >
                        <img src={process.env.REACT_APP_HOST + "images/Files/Lancer_logo.png"} width={75} height={75} />
                    </RouterLink>
                </center>


            </Grid>

            {localStorage.getItem("employer_id") ?
                <Grid item sx={{ alignSelf: "center", ml: 0 }}>
                    <Grid container spacing={10} sx={{ alignSelf: "center", ml: 0 }} >
                        <Grid item  > <Link component={RouterLink} to="/project_feed/my_projects" color="white" underline="none" sx={{ fontSize: "25" }}>My Projects</Link>
                        </Grid>
                        <Grid item  > <Link component={RouterLink} to="..//post_project" color="white" underline="none" sx={{ fontSize: "25" }}>Post Projects</Link>
                        </Grid>
                        <Grid item  > <Link component={RouterLink} to="..//payment" color="white" underline="none" sx={{ fontSize: "25" }}>Payment</Link>
                        </Grid>
                        <Grid item  > <Link component={RouterLink} to="/project_feed/freelancers_list" color="white" underline="none" sx={{ fontSize: "25" }}>Freelancers</Link>
                        </Grid>
                    </Grid>
                </Grid>
                : null
            }
            {localStorage.getItem("freelancer_id") ?
                <Grid item sx={{ alignSelf: "center", ml: 0 }}>
                    <Grid container spacing={10} sx={{ alignSelf: "center", ml: 0 }} >
                        <Grid item > <Link component={RouterLink} to="/project_feed/project_invitations" color="white" underline="none" sx={{ fontSize: "25" }}>Project Invitations</Link>
                        </Grid>
                        <Grid item > <Link component={RouterLink} to="..//payment" color="white" underline="none" sx={{ fontSize: "25" }}>Payment</Link>
                        </Grid>
                        <Grid item > <Link component={RouterLink} to="/project_feed/my_projects" color="white" underline="none" sx={{ fontSize: "25" }}>My Projects</Link>
                        </Grid>
                    </Grid>
                </Grid>
                : null
            }
            <Grid item sx={{ alignSelf: "center" }} >
                <Profile_Nav />
            </Grid>
        </Grid>
    )
}
export default Nav;