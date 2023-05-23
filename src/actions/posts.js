import * as api from '../api';
import * as actionType from '../constants/actionTypes';

// Action creator

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type:actionType.START_LOADING});
        const {data} = await api.fetchPosts(page);
        dispatch({type:actionType.FETCH_ALL, payload:data});
        dispatch({type:actionType.END_LOADING});
    } catch (error) {
        console.log(error.message);
    }
}
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type:actionType.START_LOADING});
        const {data} = await api.fetchPost(id);
        dispatch({type:actionType.FETCH_POST_BY_ID, payload:data});
        dispatch({type:actionType.END_LOADING});
    } catch (error) {
        console.log(error.message);
    }  
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type:actionType.START_LOADING});
        const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
        dispatch({type:actionType.FETCH_ALL_BY_SEARCH, payload:{data}});
        dispatch({type:actionType.END_LOADING});
    } catch (error) {
        console.log(error);
    }
}


export const createPost = (post,history) => async (dispatch) => {
    try {
        dispatch({type:actionType.START_LOADING});
        const {data} = await api.createPost(post);
        dispatch({type:actionType.CREATE, payload:data});
        dispatch({type:actionType.END_LOADING});
        history.push(`/posts/${data._id}`);
    } catch (error) {
        console.log(error.message);
    }
}
export const updatePost = (id,post) => async (dispatch) => {
    try {
        dispatch({type:actionType.START_LOADING});
        const {data} = await api.updatePost(id,post);
        dispatch({type:actionType.UPDATE, payload:data});
        dispatch({type:actionType.END_LOADING});
    } catch (error) {
        console.log(error.message);
    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({type:actionType.START_LOADING});
        await api.deletePost(id);
        dispatch({ type:actionType.DELETE, payload:id});
        dispatch({type:actionType.END_LOADING});
    } catch (error) {
        console.log(error.message);
    }
}
export const likePost = (id) => async (dispatch) => {
    try {
        // dispatch({type:actionType.START_LOADING});
        const {data} = await api.likePost(id);
        dispatch({type:actionType.LIKE, payload:data});
        // dispatch({type:actionType.END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const commentPost = (value,id) => async (dispatch) => {
    try {
      //  dispatch({type:actionType.START_LOADING});
        const {data} = await api.comment(value,id);
        dispatch({type:actionType.COMMENT, payload:data});
     //   dispatch({type:actionType.END_LOADING});
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}
