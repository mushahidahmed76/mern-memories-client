import React, { useState } from "react";
import useStyles from './styles';
import { CardActions, Card, CardContent, CardMedia, Button, Typography, ButtonBase  } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost,likePost } from "../../../actions/posts";
import {useHistory} from 'react-router-dom';

const Post = ({setCurrentId,post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [likes,setLikes] = useState(post.likes);
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === (userId));
    const handleLikes = async () => {
        dispatch(likePost(post._id));
        if(hasLikedPost){
            // already liked means remove like
            setLikes(post.likes.filter((id)=>id !== userId));
        }else{
            // not liked before means add new like
            setLikes([
                ...likes,
                userId
            ]);
        }

    }
    const Likes = () => {
        if(likes.length > 0){
            return  likes.find((like) => like === (userId))
            ? (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's': ''}`}</>
            ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'like':'likes'}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
    };
    const openPost = () => history.push(`/posts/${post._id}`);

    return(
        
        <Card className={classes.card} raised elevation={6}>
           <ButtonBase className={classes.cardAction} onClick={openPost} >
                <CardMedia className={classes.media} image={post.selectedFile  || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{ moment(post.createdAt).fromNow() }</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                    <div className={classes.overlay2}>
                        <Button 
                        style={ { color:'white' } } 
                        size="small" 
                        onClick={()=>setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>

                    </div>
                )}

                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary"> { post.tags.map((tag)=> `#${tag} `)} </Typography> 
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom> { post.title } </Typography>
            
                <CardContent>
                    <Typography className={classes.message} variant="body2" gutterBottom> { post.message } </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLikes}>
                    <Likes/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post.creator) && (
                    <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                         Delete
                    </Button>
                )}
                
            </CardActions>
        </Card>
    )
}

export default Post;