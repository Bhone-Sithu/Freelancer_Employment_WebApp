import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";

function FeaturedPost(props) {
    const { post } = props;

    return (
        <Grid item xs={12}>
            <Link to={`/freelancer_view/${post._id}`} >
            <CardActionArea >
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {post.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post.country}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {post.skillset.join(" , ")}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Go to Detail...
                        </Typography>
                    </CardContent>

                </Card>
            </CardActionArea>
        </Link>
    </Grid>
  );
}


export default FeaturedPost;