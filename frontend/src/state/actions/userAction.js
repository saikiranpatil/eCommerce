import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCESS,
    CLEAR_ERRORS,
} from '../constants/userConstants';

// Login 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post("/api/v1/login", { email, password }, config);

        dispatch({
            type: LOGIN_SUCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.error,
        })
    }
};

// Register 
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.post("/api/v1/register", userData, {config});

        dispatch({
            type: REGISTER_USER_SUCESS,
            payload: data.user,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.error,
        })
    }
};

// Load user 
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get("/api/v1/me");

        dispatch({
            type: LOAD_USER_SUCESS,
            payload: data.user,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.error,
        })
    }
};

// clear all ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}