import * as api from '../api';
import * as actionType from '../constants/actionTypes';

// Action creator

export const signIn = (formData,history) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData);
        dispatch({type:actionType.AUTH,data});
        history.push('/');
    } catch (error) {
        console.log(error.message);
    }
}

export const signUp = (formData,history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        dispatch({type:actionType.AUTH,data});
        history.push('/');
    } catch (error) {
        console.log(error.message);
    }
}

