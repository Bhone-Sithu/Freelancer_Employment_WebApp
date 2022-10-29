import { Grid } from "@mui/material";
import { Link as RouterLink, Router, Routes, Route } from "react-router-dom";
import Link from '@mui/material/Link';
const Nav = () => {
    return (
        <Grid container sx={{ backgroundColor: "#8f78ff", p: "10" }}>

            {/* <Grid item xs={8}><Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Lancer Freelance
                            </Typography></Grid> */}
            <Grid item xs={6}>
                <RouterLink to="/project_feed">
                    <img src="../../Lancer_logo.png" width={75} height={75} />
                </RouterLink>

            </Grid>

            {localStorage.getItem("employer_id") ?
                <Grid item sx={{ alignSelf: "center" }}>
                    <Grid container spacing={10} >
                        <Grid item > <Link component={RouterLink} to="/project_feed/my_projects" color="white" underline="none" sx={{ fontSize: "25" }}>My Projects</Link>
                        </Grid>
                        <Grid item > <Link component={RouterLink} to="..//post_project" color="white" underline="none" sx={{ fontSize: "25" }}>Post Projects</Link>
                        </Grid>
                        <Grid item > <Link component={RouterLink} to="..//payment" color="white" underline="none" sx={{ fontSize: "25" }}>Payment</Link>
                        </Grid>
                    </Grid>
                </Grid>
                : null
            }
            {localStorage.getItem("freelancer_id") ?
                <Grid item sx={{ alignSelf: "center" }}>
                    <Grid container spacing={2}>
                        <Grid item > <Link component={RouterLink} to="/project_feed/project_invitations" color="white" underline="none" sx={{ fontSize: "25" }}>Project Invitations</Link>
                        </Grid>
                    </Grid>
                </Grid>
                : null
            }
        </Grid>
    )
}
export default Nav;