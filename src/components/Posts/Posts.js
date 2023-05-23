import React from "react";
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({setCurrentId}) => {
    const { posts,isLoading } = useSelector(( state )=> state.posts);
    
    const classes = useStyles();
    if(!isLoading && !posts.length){ return 'No Posts'; }
    return(
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alighitem="stretch" spacing={3}>
                { posts.map((post)=>(
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post setCurrentId={setCurrentId} post={post} />
                    </Grid>
                ))}
            </Grid>
       )
    )
}

export default Posts;