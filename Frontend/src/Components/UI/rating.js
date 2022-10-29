import { Button, Container, TextField, Rating, Typography, Grid } from '@mui/material'
import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios'
import { useParams } from 'react-router-dom';
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

function Rating_Form(props) {
    const {dashboard} = props
    const [feedback, setFeedBack] = useState((localStorage.getItem("employer_id")?dashboard.freelancer_rating.feedback:dashboard.employer_rating.feedback));    
    const [star, setStar] = useState((localStorage.getItem("employer_id")?dashboard.freelancer_rating.star:dashboard.employer_rating.star));
    const [hover, setHover] = useState(-1);
    const rate = async(event) => {
        event.preventDefault();
        const rating = {
            star,
            feedback,
            rate_to: localStorage.getItem("employer_id")?"freelancer":"employer"
        }
        let res = await axios.put(process.env.REACT_APP_HOST + `api/dashboards/rate/${dashboard._id}`,rating)
        localStorage.getItem("employer_id")?
        dashboard.freelancer_rating = res.data.freelancer_rating
        :
        dashboard.employer_rating = res.data.employer_rating
    }
    return (
        <>
            <Container sx={{ mx: 0, my: 5, height: "100%", backgroundColor:"#c7fdff" }}>
                <center>
                    <Typography variant="h6">{localStorage.getItem("employer_id")?"Rate Freelancer":"Rate Employer"}</Typography>

                    <Rating name="half-rating" sx={{ mt:2 }}
                        value={star}
                        onChange={(event, newValue) => {
                            setStar(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            
                            if(hover==-1) setHover(star)
                            else setHover(newHover);
                        }}
                        defaultValue={2.5} precision={0.5} size="large"
                    />
                    <Typography variant="body1" sx={{ opacity: 0.6, ml: 2 }}>{labels[hover !== -1 ? hover : star]}</Typography>

                </center>
                <TextField
                    id="feedback"
                    label="Feedback"
                    variant='outlined'
                    multiline
                    fullWidth
                    value={feedback}
                    sx={{ my: 5 }}
                    onChange={(event) => {
                        setFeedBack(event.target.value);
                    }}
                />
                <br />
                <center>
                    <Button
                        onClick={rate}
                        variant="contained"
                        sx={{ mt: 2, px: 20, py: 2, mb: 5,backgroundColor:"#8f78ff",borderRadius:"10px" }}
                        size="large"
                    >
                        Rate
                    </Button>
                </center>

            </Container>
        </>
    )
}

export default Rating_Form