import { Alert, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { topup, withdraw, transfer } from '../Components/Function/payment_function.js'
import Payment_History from "../Components/UI/payment_history"
import Nav from "../Components/UI/nav"

const Payment = (props) => {

    const { data } = props;
    const employer_id = localStorage.getItem("employer_id")
    const freelancer_id = localStorage.getItem("freelancer_id")
    const admin_id = localStorage.getItem("admin_id")
    const [user, setUser] = useState({});
    const [dialog, setDialog] = React.useState({ open: false });
    const [response, setResponse] = useState({ status: 0, message: "" });
    const [errors, setError] = useState("");


    const onCancel = () => {
        setDialog({ open: false });
        
    }

    const onTopup = async (currency) => {
        let res = await topup(user._id, currency);
        setResponse(res);
        setDialog({ open: false });
    }

    const onWithdraw = async (currency) => {
        if (currency > user.currency) {
            console.log("hi")
            setError("Withdraw amount is greater than your total amount!")
        } else {
            let res = await withdraw(user._id, currency)
            setDialog({ open: false });
            setResponse(res);
        }

    }

    const onTransfer = async (receiver, currency) => {
        let res = await transfer(user._id, receiver, currency)
        setDialog({ open: false });
        setResponse(res);
    }
    useEffect(() => {
        if (employer_id) {
            axios.get(process.env.REACT_APP_HOST + `api/employers/get/${employer_id}`)
                .then(res => {
                    setUser(res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if (freelancer_id) {
            axios.get(process.env.REACT_APP_HOST + `api/freelancer/get/${freelancer_id}`)
                .then(res => {
                    setUser(res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if (admin_id) {
            axios.get(process.env.REACT_APP_HOST + `api/admins/get/${admin_id}`)
                .then(res => {
                    setUser(res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    })


    return <div style={{ backgroundColor: "#c7fdff", height: "100%" }}>
        <Nav />
        <Container sx={{ backgroundColor: "#c7fdff" }}>
            <Card sx={{ display: 'flex', mt: 5, borderRadius: "15px", mb: 10 }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h1" variant="h2" sx={{ textAlign: "center" }}>
                        {user.currency}$
                    </Typography>
                    <Grid container spacing={10}>
                        <Grid item xs={4}><Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                setError("")
                                setDialog({
                                    title: "Top up",
                                    content: "Type the amount of currency you want to top up to your account.",
                                    open: true,
                                    onPerform: onTopup,
                                    errors:errors
                                })
                            }}
                            sx={{ mt: 3, mb: 2, backgroundColor: "#8f78ff" }}
                        >
                            Top-up
                        </Button></Grid>
                        <Grid item xs={4}><Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                setError("")
                                setDialog({
                                    title: "Transfer",
                                    content: "Type the amount of currency and email of the receiver.",
                                    open: true,
                                    onPerform: onTransfer,
                                    errors:errors
                                })
                            }}
                            sx={{ mt: 3, mb: 2, backgroundColor: "#8f78ff" }}
                        >
                            Transfer
                        </Button></Grid>
                        <Grid item xs={4}><Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                setError("")
                                setDialog({
                                    title: "Withdraw",
                                    content: "Type the amount of currency you want to Withdraw from your account.",
                                    open: true,
                                    onPerform: onWithdraw
                                })
                            }}
                            sx={{ mt: 3, mb: 2, backgroundColor: "#8f78ff" }}
                        >
                            Withdraw
                        </Button></Grid>
                    </Grid>
                </CardContent>
            </Card>
            {response.status == "200" ? <Alert severity="success" sx={{ mb: 5 }}> {response.message}</Alert> : null}
            {response.status == "400" ? <Alert severity="error" sx={{ mb: 5 }}> {response.message}</Alert> : null}
            <Payment_History id={user._id} />
        </Container>
        <FormDialog title={dialog.title} content={dialog.content}
            open={dialog.open} onCancel={onCancel} onPerform={dialog.onPerform} errors={errors} />
    </div>
}

export function FormDialog(props) {
    const { title, content, open, onCancel, onPerform, errors } = props;
    const [currency, setCurrency] = useState(0);
    const [receiver, setReceiver] = useState("");


    const onSubmit = () => {
        
        if (title === "Transfer") {
            onPerform(receiver, currency);
        } else {
            onPerform(currency);
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={onCancel}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                    {title === "Transfer" ?
                        <TextField
                            autoFocus
                            value={receiver}
                            onChange={(event) => setReceiver(event.target.value)}
                            id="receiver"
                            label="Id number"
                            type="text"
                            fullWidth
                            variant="standard"
                        /> : null}
                    <br />
                    <br />
                    <TextField
                        autoFocus
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                        id="currency"
                        label="Amount"
                        type="number"
                        error={errors === "" ? false : true}
                        helperText={errors}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onSubmit}>{title}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Payment