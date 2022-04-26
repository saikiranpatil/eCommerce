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
    LOGOUT_FAIL,
    LOGOUT_SUCESS,
    UPDATE_USERS_REQUEST,
    UPDATE_USERS_FAIL,
    UPDATE_USERS_SUCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_FAIL,
    ALL_USERS_SUCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCESS,
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

        const { data } = await axios.post("/api/v1/register", userData, { config });

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

// Logout
export const logOut = () => async (dispatch) => {
    try {
        await axios.get("/api/v1/logout");

        dispatch({
            type: LOGOUT_SUCESS,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.error,
        })
    }
};

// update profile 
export const updateUsers = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USERS_REQUEST });

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.put("/api/v1/me/update", userData, { config });

        dispatch({
            type: UPDATE_USERS_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_USERS_FAIL,
            payload: error.response.data.error,
        })
    }
};

// update password 
export const updatePassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put("/api/v1/password/update", userData, { config });

        console.log(data)
        console.log("sdsdsdsdds")

        dispatch({
            type: UPDATE_PASSWORD_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.error,
        })
    }
};

// forgot password 
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(`/api/v1/forgot/password`, email, { config });

        dispatch({
            type: FORGOT_PASSWORD_SUCESS,
            payload: data.message,
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.error,
        })
    }
};

// reset password 
export const resetPassword = (token,passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, { config });

        dispatch({
            type: RESET_PASSWORD_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.error,
        })
    }
};

// Load single user 
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        const { data } = await axios.get("/api/v1/admin/users");

        dispatch({
            type: ALL_USERS_SUCESS,
            payload: data.users,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.error,
        })
    }
};

// Load single user 
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({
            type: USER_DETAILS_SUCESS,
            payload: data,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.error,
        })
    }
};


// update password 
export const updateUser = (id,userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, { config });

        dispatch({
            type: UPDATE_USER_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.error,
        })
    }
};

// delete user
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({
            type: DELETE_USER_SUCESS,
            payload: data.sucess,
        });

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
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