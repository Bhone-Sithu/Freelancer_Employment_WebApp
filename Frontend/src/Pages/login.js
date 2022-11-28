import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { login } from '../Components/Function/login';
import { useNavigate, Link } from "react-router-dom";


const theme = createTheme();

export default function Login() {
    const [message, setMessage] = React.useState("");
    const [status, setStatus] = React.useState(0);
    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await login(event);
        console.log(res);
        setStatus(res.status);
        setMessage(res.message);
        localStorage.clear();
        if (res.status == 200) {
            if (res.role == "admin") {
                localStorage.setItem("admin_id", res.id);
                setTimeout(() => { navigate("/admin_dashboard") }, 3000);
            }
            if (res.role == "employer") {
                localStorage.setItem("employer_id", res.id);
                setTimeout(() => { navigate("/project_feed") }, 3000);
            }
            if (res.role == "freelancer") {
                localStorage.setItem("freelancer_id", res.id)
                setTimeout(() => { navigate("/project_feed") }, 3000);

            }
        }


    };
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
                    
                        <img src='Lancer_logo.png' width={200} height={200} style={{borderRadius:"50%"}}/>
                    <br></br>
                    <Typography component="h1" variant="h5" >
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2} >
                            {status == 200 &&
                                <Grid item xs={12}>
                                    <Alert severity="success"> {message}</Alert>
                                </Grid>}
                            {status == 400 &&
                                <Grid item xs={12}>
                                    <Alert severity="error"> {message}</Alert>
                                </Grid>
                            }
                            
                                <TextField
                                
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            
                            <br/>
                            <br/>
                            <br/>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                
                                sx={{ mt: 3, mb: 2,backgroundColor:"#8f78ff" }}
                            >
                                Log in
                            </Button>
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Link to="/freelancer_register">
                                    Register as a Freelancer.
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/employer_register">
                                    Register as a Employer.
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
