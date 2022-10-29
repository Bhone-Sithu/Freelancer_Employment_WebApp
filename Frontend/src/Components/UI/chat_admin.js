import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Container } from '@mui/system'
import { useParams } from 'react-router-dom'
const Chat = (props) => {

    const { project, role } = props;
    const { id } = useParams();
    const [message, setMessage] = useState([]);
    const [effect, setEffect] = useState({ hi: true })
    // setInterval(() => {
    //     setEffect({hi:!(effect.hi)})
    // }, 2000);
    const [text, setText] = useState("")
    let user_id = localStorage.getItem("employer_id") ?? localStorage.getItem("admin_id") ?? localStorage.getItem("freelancer_id")

    // const receiver_id = (project.admin_id == user_id) ? project.admin_id : project.employer_id
    let receiver_id;
    switch (role) {
        case "admin":
            receiver_id = project.admin_id;
            break;
        case "freelancer":
            receiver_id = project.freelancer_id;
            break;
        case "employer":
            receiver_id = project.employer_id;
            break;
        case "monitor":
            receiver_id = project.freelancer_id;
            user_id = project.employer_id;
            break;
    }
    useEffect(() => {
        
        axios.get(process.env.REACT_APP_HOST + `api/projects/get/${id}`)
            .then(res => {
                const a = (res.data.employer_id == user_id) ? res.data.admin_id : res.data.employer_id
                axios.post(process.env.REACT_APP_HOST + 'api/chats/view_message', { project_id: res.data._id, sender_id: user_id, receiver_id })
                    .then(res => {

                        setMessage(res.data)
                        console.log(res.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
            return () => {
                console.log("unmoount")
                setMessage([])
            }
    }, [effect])
    const send_message = async (event) => {
        let res = await axios.post(process.env.REACT_APP_HOST + 'api/chats/send_message', {
            project_id: project._id,
            sender_id: user_id,
            receiver_id,
            content: text,
        })
        setEffect({ hi: !(effect.hi) })
        setText("");
    }
    return (
        <div style={{ backgroundColor: "#c7fdff" }}>
            <Box sx={{ width: "100%", height: "13%", backgroundColor: "white" }}>

                {role == "admin" ?
                    <Typography variant="h6" gutterBottom py={2} px={3}>
                        Admin
                    </Typography>

                    :
                    role == "monitor" ?
                        <Grid container justifyContent={"space-between"}>
                            <Typography variant="h6" gutterBottom py={2} px={3}>
                                Freelancer
                            </Typography>
                            <Typography variant="h6" gutterBottom py={2} px={3}>
                                Employer
                            </Typography>
                        </Grid>
                        :
                        <Typography variant="h6" gutterBottom py={2} px={3}>
                            {role=="freelancer" ? "Freelancer" : "Employer"}
                        </Typography>

                }


            </Box>
            <div style={{ width: "100%", height: "81%", backgroundColor: "#c7fdff", p: 10 }}>
                <Grid container spacing={3} sx={{ p: 2, backgroundColor: "#c7fdff" }} >

                    {Array.isArray(message) ? message.map(val => (
                        user_id == val.sender_id ?
                            <Grid item xs={12} container justifyContent="flex-end">
                                <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, backgroundColor: "#8f78ff", color: "white", borderRadius: "5px" }}>{val.content}</Paper>
                            </Grid> :
                            <Grid item xs={12} container  >
                                <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, borderRadius: "5px" }}>{val.content}</Paper>
                            </Grid>

                    )) : null}

                </Grid>
                {role == "monitor" ? null :
                    <Paper elevation={10} sx={{ clear: "both", top: "100%", bottom: "0px", position: "sticky", py: 2, pl: 5, pr: 0, width: "100%", backgroundColor: "white" }}>
                        <Grid container justifyContent="space-between" sx={{ width: "100%" }}>
                            <Grid item xs={10}><TextField id="standard-basic" fullWidth label="Send a message" variant="standard" onChange={(event) => { setText(event.target.value) }} value={text} /></Grid>
                            <Grid item >
                                <Button
                                    type="button"
                                    onClick={send_message}
                                    variant="contained"
                                    sx={{ mx: 5, mt: 2 }}
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>

                    </Paper>
                }

            </div>

        </div>
    )
}

export default Chat