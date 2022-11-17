import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Container } from '@mui/system'
import { useParams } from 'react-router-dom'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import fileDownload from 'js-file-download';
import CancelIcon from '@mui/icons-material/Cancel';
const Chat_Admin = (props) => {

    const { project, role } = props;
    const { id } = useParams();
    const [message, setMessage] = useState(["",""]);
    const [effect, setEffect] = useState({ hi: true })
    const [file, setFile] = useState();
    const [preview, setPreview] = useState("");
    const [is_preview, setIsPreview] = useState(false);
    const [text, setText] = useState("")
    let user_id = localStorage.getItem("employer_id") ?? localStorage.getItem("admin_id") ?? localStorage.getItem("freelancer_id")
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
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
        if (file) {
            const file_reader = new FileReader();
            file_reader.onload = () => {
                setPreview(file_reader.result)
            };
            file_reader.readAsDataURL(file);
            setIsPreview(file.name.match(/\.(jpeg|jpg|png)$/));
        }
    }, [effect, file,role])
    const send_message = async (event) => {
        if (file) {
            const form_data = new FormData();
            form_data.append('project_id', project._id);
            form_data.append('sender_id', user_id);
            form_data.append('receiver_id', receiver_id);
            form_data.append('file', file);
            let res = await axios.post(process.env.REACT_APP_HOST + 'api/chats/send_file    ', form_data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            setFile();
            setEffect({ hi: !(effect.hi) })
        }
        else {
            let res = await axios.post(process.env.REACT_APP_HOST + 'api/chats/send_message', {
                project_id: project._id,
                sender_id: user_id,
                receiver_id,
                content: text,
            })
            setEffect({ hi: !(effect.hi) })
            setText("");
        }
    }
    const handle_file = async (event) => {
        setFile(event.target.files[0]);
    }
    const file_download = async (url, file_name) => {
        axios.get(url, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, file_name)
            })
    }
    const delete_message = async (id) => {
        const res = await axios.delete(process.env.REACT_APP_HOST + `api/chats/delete_message/${id}`)
        setEffect({ hi: !(effect.hi) })
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
                            {role == "freelancer" ? "Freelancer" : "Employer"}
                        </Typography>

                }


            </Box>
            <div style={{ width: "100%", height: "81%", backgroundColor: "#c7fdff", p: 10 }}>
                <Grid container spacing={3} sx={{ p: 2, backgroundColor: "#c7fdff" }} >

                    {Array.isArray(message) ? message.map(val => (
                        user_id == val.sender_id ?
                            val.content == "$file" ?
                                val.file_type.substring(0, 5) == "image" ?
                                    <Grid item xs={12} container justifyContent="flex-end">
                                        <IconButton onClick={() => { delete_message(val._id) }} sx={{}}>
                                            <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                        </IconButton>
                                        <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, backgroundColor: "#8f78ff", color: "white", borderRadius: "5px" }}>
                                            <img src={process.env.REACT_APP_HOST + "images/" + val.file_path} width="250" height="250" style={{ borderRadius: 15 }} />
                                        </Paper>
                                    </Grid>
                                    :
                                    val.file_type.substring(0, 5) == "video" ?
                                        <Grid item xs={12} container justifyContent="flex-end">
                                            <IconButton onClick={() => { delete_message(val._id) }} sx={{}}>
                                                <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                            </IconButton>
                                            <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, backgroundColor: "#8f78ff", color: "white", borderRadius: "5px" }}>
                                                <video width="250" height="250" controls>
                                                    <source src={process.env.REACT_APP_HOST + "images/" + val.file_path} type={val.file_type} />
                                                </video>
                                            </Paper>
                                        </Grid> :
                                        val.file_type.substring(0, 5) == "audio" ?
                                            <Grid item xs={12} container justifyContent="flex-end">
                                                <IconButton onClick={() => { delete_message(val._id) }} sx={{}}>
                                                    <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                                </IconButton>
                                                <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, backgroundColor: "#8f78ff", color: "white", borderRadius: "5px" }}>
                                                    <audio controls>
                                                        <source src={process.env.REACT_APP_HOST + "images/" + val.file_path} type={val.file_type} />
                                                    </audio>
                                                </Paper>
                                            </Grid>
                                            :
                                            <Grid item xs={12} container justifyContent="flex-end">
                                                <IconButton onClick={() => { delete_message(val._id) }} sx={{}}>
                                                    <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                                </IconButton>
                                                <Paper elevation={3} sx={{ width: 'fit-content', height: 'fit-content', px: 2, py: 0.5, backgroundColor: "#8f78ff", color: "white", borderRadius: "5px" }}>
                                                    <Grid container>
                                                        <IconButton onClick={() => file_download(process.env.REACT_APP_HOST + "images/" + val.file_path, val.file_path.substring(11))}>
                                                            <DownloadForOfflineIcon fontSize="large" />
                                                        </IconButton>
                                                        <Typography variant='body1' sx={{ p: 1 }}>
                                                            {val.file_path.substring(11)}
                                                        </Typography>

                                                    </Grid>
                                                    <a href={process.env.REACT_APP_HOST + "images/" + val.file_path} target="_blank" style={{ color: "black", backgroundColor: "#c7fdff", padding: 4, borderRadius: 5, marginLeft: "45%" }}> View File</a>
                                                </Paper>
                                            </Grid>
                                :
                                <Grid item xs={12} container justifyContent="flex-end">
                                    <IconButton onClick={() => { delete_message(val._id) }} sx={{}}>
                                        <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                    </IconButton>
                                    <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, backgroundColor: "#8f78ff", color: "white", borderRadius: "5px" }}>{val.content}</Paper>

                                </Grid>
                            :
                            val.content == "$file" ?
                                val.file_type.substring(0, 5) == "image" ?
                                    <Grid item xs={12} container >
                                        <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, borderRadius: "5px" }}>
                                            <img src={process.env.REACT_APP_HOST + "images/" + val.file_path} width="250" height="250" style={{ borderRadius: 15 }} />
                                        </Paper>
                                        <IconButton onClick={() => { delete_message(val._id) }} sx={{}}>
                                            <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                        </IconButton>
                                    </Grid>
                                    :
                                    val.file_type.substring(0, 5) == "video" ?
                                        <Grid item xs={12} container >
                                            <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, borderRadius: "5px" }}>
                                                <video width="250" height="250" controls>
                                                    <source src={process.env.REACT_APP_HOST + "images/" + val.file_path} type={val.file_type} />
                                                </video>
                                            </Paper>
                                            <IconButton onClick={() => { delete_message(val._id) }} sx={{}}>
                                                <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                            </IconButton>
                                        </Grid> :
                                        val.file_type.substring(0, 5) == "audio" ?
                                            <Grid item xs={12} container >
                                                <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, borderRadius: "5px" }}>
                                                    <audio controls>
                                                        <source src={process.env.REACT_APP_HOST + "images/" + val.file_path} type={val.file_type} />
                                                    </audio>
                                                </Paper>
                                                <IconButton onClick={() => { delete_message(val._id) }} sx={{}}>
                                                    <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                                </IconButton>
                                            </Grid>
                                            :
                                            <Grid item xs={12} container >
                                                <Paper elevation={3} sx={{ width: 'fit-content', height: 'fit-content', px: 2, py: 0.5, borderRadius: "5px" }}>
                                                    <Grid container>
                                                        <IconButton onClick={() => file_download(process.env.REACT_APP_HOST + "images/" + val.file_path, val.file_path.substring(11))}>
                                                            <DownloadForOfflineIcon fontSize="large" />
                                                        </IconButton>
                                                        <Typography variant='body1' sx={{ p: 1 }}>
                                                            {val.file_path.substring(11)}
                                                        </Typography>

                                                    </Grid>
                                                    <a href={process.env.REACT_APP_HOST + "images/" + val.file_path} target="_blank" style={{ color: "white", backgroundColor: "#8f78ff", padding: 4, borderRadius: 5, marginLeft: "45%" }}> View File</a>
                                                </Paper>
                                                <IconButton onClick={() => { delete_message(val._id) }} sx={{}}>
                                                    <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                                </IconButton>
                                            </Grid>
                                :
                                <Grid item xs={12} container  >
                                    <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 0.5, borderRadius: "5px" }}>{val.content}</Paper>
                                    <IconButton onClick={() => { delete_message(val._id) }} sx={{ }}>
                                        <CancelIcon sx={{ position: 'absolute', color: '#ff6363' }} />
                                    </IconButton>
                                </Grid>

                    )) : null}

                </Grid>
                {role == "monitor" ? null :
                    <Paper elevation={10} sx={{ top: 'auto', bottom: 0, position: "sticky", py: 2, pl: 5, pr: 0, width: "100%", backgroundColor: "white" }}>
                        <Grid container justifyContent="space-between" sx={{ width: "100%" }}>

                            {
                                file ?
                                    preview != "" ?
                                        is_preview ?
                                            <div>
                                                <img src={preview} width="250" height="250" />
                                                <IconButton onClick={() => { setFile(); setPreview(""); }} sx={{ position: 'absolute', top: 0, color: '#ff6363' }}>
                                                    <CancelIcon sx={{ position: 'absolute', top: 0, color: '#ff6363' }} />
                                                </IconButton>

                                            </div>

                                            : <Paper elevation={3} sx={{ width: 'fit-content', px: 2, py: 2, backgroundColor: "#8f78ff", color: "white", borderRadius: "5px" }}>
                                                <InsertDriveFileIcon sx={{ mt: "auto" }} /> {file.name}
                                            </Paper>
                                        : null :
                                    <Grid xs={12} md={9}><TextField id="standard-basic" fullWidth label="Send a message" variant="standard" onChange={(event) => { setText(event.target.value) }} value={text} /></Grid>
                            }

                            <Grid container md={3} flexWrap="nowrap">
                                <IconButton sx={{ mt: 2, color: "#8f78ff", mt: 0 }} size="large" variant="contained" component="label">

                                    <InsertDriveFile sx={{ fontSize: 40, mt: 0 }} />

                                    <input type="file" onChange={handle_file} hidden />
                                </IconButton>

                                <Button
                                    type="button"
                                    onClick={send_message}
                                    variant="contained"

                                    sx={{ px: 5, mx: 5, backgroundColor: "#8f78ff", height: "50px", my: "auto" }}
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

export default Chat_Admin