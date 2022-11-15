import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";

function FeaturedPost(props) {
    const { post,from } = props;
    let link = `/project_detail/${post._id}`
    if(from == "profile") link = `/project_dashboard/${post._id}`

    return (
        <Grid item xs={12} >
            <Link to = {link}>
            
                <CardActionArea sx={{borderRadius:"15px"}}>
                    <Card sx={{ display: 'flex',borderRadius:"10px"}}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {post.deadline}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {post.description}
                            </Typography>
                            <Typography variant="subtitle1" color="#8f78ff" sx={{marginLeft:"90%"}}>
                                Go to Detail
                            </Typography>
                            {post.is_approved?null:<Alert severity="error">Not Approved</Alert>}
                            
                        </CardContent>

                    </Card>
                </CardActionArea>
            </Link>
        </Grid>
    );
}


export default FeaturedPost;