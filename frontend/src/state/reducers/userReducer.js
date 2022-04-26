import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_FAIL,
    ALL_USERS_SUCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCESS,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCESS,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCESS,
    UPDATE_USERS_REQUEST,
    UPDATE_USERS_FAIL,
    UPDATE_USERS_SUCESS,
    UPDATE_USERS_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCESS,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCESS,
    FORGOT_PASSWORD_RESET,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCESS,
    CLEAR_ERRORS
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:

            return {
                loading: true,
                isAuthenticated: false
            }

        case LOGIN_SUCESS:
        case REGISTER_USER_SUCESS:
        case LOAD_USER_SUCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:

            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOAD_USER_FAIL:

            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_SUCESS:

            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            }

        case LOGOUT_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USERS_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case DELETE_USER_REQUEST:
        case UPDATE_USER_REQUEST:

            return {
                ...state,
                loading: true,
            }

        case UPDATE_USERS_SUCESS:
        case UPDATE_PASSWORD_SUCESS:
        case UPDATE_USER_SUCESS:


            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }

        case DELETE_USER_SUCESS:


            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }

        case UPDATE_USERS_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
        case UPDATE_PASSWORD_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_USERS_RESET:
        case UPDATE_USER_RESET:
        case UPDATE_PASSWORD_RESET:

            return {
                ...state,
                isUpdated: false,
            }

        case DELETE_USER_RESET:

            return {
                ...state,
                isDeleted: false,
            }

        case UPDATE_USER_RESET:

            return {
                ...state,
                isUpdated: false,
            }

        case DELETE_USER_RESET:

            return {
                ...state,
                isDeleted: false,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:

            return {
                ...state,
                loading: true,
                error: null
            }

        case FORGOT_PASSWORD_SUCESS:

            return {
                ...state,
                loading: false,
                message: action.payload,
            }

        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case RESET_PASSWORD_SUCESS:

            return {
                ...state,
                loading: false,
                sucess: action.payload
            }

        case FORGOT_PASSWORD_RESET:

            return {
                ...state,
                message: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:

            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCESS:

            return {
                ...state,
                loading: false,
                users: action.payload,
            }

        case ALL_USERS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

export const userDetailsReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:

            return {
                ...state,
                loading: true,
            }

        case USER_DETAILS_SUCESS:

            return {
                ...state,
                loading: false,
                user: action.payload.user,
                sucess: action.payload.sucess,
            }

        case USER_DETAILS_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};