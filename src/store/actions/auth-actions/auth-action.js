import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//Email Validation Action
export function emailValidationRequest () {
    return {
        type: TYPES.EMAIL_VALIDATE_REQUEST,
    }
}

export function emailValidationSuccess (user) {
    return {
        type: TYPES.EMAIL_VALIDATE_SUCCESS,
        user,
    }
}

export function emailValidationFailure (error) {
    return {
        type: TYPES.EMAIL_VALIDATE_FAILURE,
        error,
    }
}


export const emailValidation = (params) => {
    return async dispatch => {
        dispatch(emailValidationRequest());
            try {
                Api.postAxios(endPoints.validateEmail ,params).then(response =>{
                    if (response.isSuccess && response.statusCode === 200) {
                        dispatch(emailValidationSuccess(response))
                    } else {
                        dispatch(emailValidationFailure(response))
                    }   
                })
            } catch (error) {
                dispatch(emailValidationFailure(error))
            }
    }
}

//=======================================================================================================
//Login Action
export function loginRequest () {
    return {
        type: TYPES.USER_LOGIN_REQUEST,
    }
}

export function loginSuccess (user) {
    return {
        type: TYPES.USER_LOGIN_SUCCESS,
        user,
    }
}

export function loginFailure (error) {
    return {
        type: TYPES.USER_LOGIN_FAILURE,
        error,
    }
}

export const loginValidation = (params) => {
    return async dispatch => {
        dispatch(loginRequest())
        try {
            let response = await Api.postAxios(endPoints.login ,params)
            if (response.isSuccess && response.statusCode === 200) {
                console.log('[login-actions] login success case', response);
                dispatch(loginSuccess(response))
            } else {
                console.log('[login-action] failure response ', response);
                dispatch(loginFailure(response))
            } 
        } catch (error) {
            dispatch(loginFailure(error))
        }
    }    
}


//=======================================================================================================
//Save Response after signup Action
export function saveSignupRequest (user) {
    return {
        type: TYPES.SAVE_SIGNUP_REQUEST,
        user
    }
}

export const saveSignupResponse = (data) => {
    console.log('[signup response saving]', data);
    return async dispatch => {
        // dispatch(saveSignupRequest(user))
        dispatch(loginSuccess(data))
    }   
}

//=======================================================================================================
//Logout Action
export function logOutRequest () {
    return {
        type: TYPES.LOG_OUT_REQUEST,
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(logOutRequest())
    }   
}


//=======================================================================================================
//Megic Login Action
export function megicLoginRequest () {
    return {
        type: TYPES.MEGIC_LOGIN_REQUEST,
    }
}

export function megicLoginSuccess (user) {
    return {
        type: TYPES.MEGIC_LOGIN_SUCCESS,
        user,
    }
}

export function megicLoginFailure (error) {
    return {
        type: TYPES.MEGIC_LOGIN_FAILURE,
        error,
    }
}

export const megicLoginValidation = (params) => {
    return async dispatch => {
        dispatch(megicLoginRequest())
        try {
            let response = await Api.postAxios(endPoints.megicLogin ,params)
            console.log('[login-actions] megic login success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                console.log('[login-actions] megic login success case', response);
                dispatch(megicLoginSuccess(response))
            } else {
                console.log('[login-action] megic failure response ', response);
                dispatch(megicLoginFailure(response))
            } 
        } catch (error) {
            dispatch(megicLoginFailure(error))
        }
    }    
}


//=======================================================================================================
//Reset password Action
export function resetPasswordRequest () {
    return {
        type: TYPES.RESET_PASSWORD_REQUEST,
    }
}

export function resetPasswordSuccess (user) {
    return {
        type: TYPES.RESET_PASSWORD_SUCCESS,
        user,
    }
}

export function resetPasswordFailure (error) {
    return {
        type: TYPES.RESET_PASSWORD_FAILURE,
        error,
    }
}

export const resetPassword = (params) => {
    return async dispatch => {
        dispatch(resetPasswordRequest())
        try {
            let response = await Api.postAxios(endPoints.resetPassword ,params)
            console.log('[login-actions] resetPassword success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                console.log('[login-actions] resetPassword success case', response);
                dispatch(resetPasswordSuccess(response))
            } else {
                console.log('[login-action] resetPassword failure response ', response);
                dispatch(resetPasswordFailure(response))
            } 
        } catch (error) {
            dispatch(resetPasswordFailure(error))
        }
    }    
}

//=======================================================================================================
//Get Stylist Info Action
export function stylistInfoRequest () {
    return {
        type: TYPES.STYLIST_INFO_REQUEST,
    }
}

export function stylistInfoSuccess (user) {
    return {
        type: TYPES.STYLIST_INFO_SUCCESS,
        user,
    }
}

export function stylistInfoFailure (error) {
    return {
        type: TYPES.STYLIST_INFO_FAILURE,
        error,
    }
}

export const getStylistInfo = (params) => {
    return async dispatch => {
        dispatch(stylistInfoRequest())
        try {
            let response = await Api.postAxios(endPoints.getStylistInfo ,params)
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(stylistInfoSuccess(response))
                console.log('[login-actions] getStylistInfo success case', response);
            } else {
                console.log('[login-action] getStylistInfo failure response ', response);
                dispatch(stylistInfoFailure(response))
            } 
        } catch (error) {
            dispatch(stylistInfoFailure(error))
        }
    }    
}

//=======================================================================================================
//SignUp Object Action
export function SignUpObjTrackScreen (screen) {
    return {
        type: TYPES.SIGNUP_OBJ_TRACK,
        screen
    }
}

export function SignUpObjSuccess (obj) {
    return {
        type: TYPES.SIGNUP_OBJ_SUCCESS,
        obj,
    }
}

export function SignUpObjClear () {
    return {
        type: TYPES.SIGNUP_OBJ_CLEAR,
    }
}

export const signUpObj = (params, screen) => {
    console.log('[signup.js] collect obj', params);
    return async dispatch => {
        dispatch(SignUpObjTrackScreen(screen))
        try {
            dispatch(SignUpObjSuccess(params))
        } catch (error) {
            dispatch(SignUpObjFailure())
        }
    }    
}

//=======================================================================================================
//Create SignUp Object Action
export function signupRequest () {
    return {
        type: TYPES.SIGNUP_REQUEST,
    }
}

export function signupSuccess (data) {
    return {
        type: TYPES.SIGNUP_SUCCESS,
        data,
    }
}

export function signupFailure (error) {
    return {
        type: TYPES.SIGNUP_FAILURE,
        error
    }
}

export const createSignUp = (params) => {
    console.log('[createSignUp.js] Params obj', params);
    return async dispatch => {
        dispatch(signupRequest())
        try {
            let response = await Api.postAxios(endPoints.createSignUp ,params)
            console.log('[signup-actions] createSignUp success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(signupSuccess(response))
                console.log('[signup-actions] createSignUp success case', response);
            } else {
                console.log('[signup-action] createSignUp failure response ', response);
                dispatch(signupFailure(response))
            } 
        } catch (error) {
            console.log('[signup-action] createSignUp failure response ', error);
            dispatch(signupFailure(error))
        }
    }    
}

//=======================================================================================================
//Create Social links Action
export function socialLinkSubmitRequest () {
    return {
        type: TYPES.SOCIAL_LINKS_SUBMIT_REQUEST,
    }
}

export function socialLinkSubmitSuccess (data) {
    return {
        type: TYPES.SOCIAL_LINKS_SUBMIT_SUCCESS,
        data,
    }
}

export function socialLinkSubmitFailure (error) {
    return {
        type: TYPES.SOCIAL_LINKS_SUBMIT_FAILURE,
        error
    }
}

export const submitSocialLinks = (params) => {
    console.log('[submitSocialLinks.js] Params obj', params);
    return async dispatch => {
        dispatch(socialLinkSubmitRequest())
        try {
            let response = await Api.postAxios(endPoints.socialLinks ,params)
            console.log('[submitSocialLinks-actions] createSignUp success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(socialLinkSubmitSuccess(response))
                console.log('[submitSocialLinks-actions] createSignUp success case', response);
            } else {
                console.log('[submitSocialLinks-action] createSignUp failure response ', response);
                dispatch(socialLinkSubmitFailure(response))
            } 
        } catch (error) {
            dispatch(socialLinkSubmitFailure(error))
        }
    }    
}


//=======================================================================================================
//submitFirstPackage Action
export function packageRequest () {
    return {
        type: TYPES.SUBMIT_PACKAGE_REQUEST,
    }
}

export function packageSuccess (data) {
    return {
        type: TYPES.SUBMIT_PACKAGE_SUCCESS,
        data,
    }
}

export function packageFailure (error) {
    return {
        type: TYPES.SUBMIT_PACKAGE_FAILURE,
        error
    }
}

export const submitFirstPackage = (params) => {
    console.log('[submitSocialLinks.js] Params obj', params);
    return async dispatch => {
        dispatch(packageRequest())
        try {
            let response = await Api.postAxios(endPoints.selectPackage ,params)
            console.log('[submitSocialLinks-actions] createSignUp success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(packageSuccess(response))
                console.log('[submitSocialLinks-actions] createSignUp success case', response);
            } else {
                console.log('[submitSocialLinks-action] createSignUp failure response ', response);
                dispatch(packageFailure(response))
            } 
        } catch (error) {
            dispatch(packageFailure(error))
        }
    }    
}