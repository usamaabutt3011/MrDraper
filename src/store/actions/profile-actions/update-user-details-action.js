import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//UpdateProfile Object Action
export function UpdateProfileObjTrackScreen (screen) {
    return {
        type: TYPES.PROFILE_OBJ_TRACK,
        screen
    }
}

export function UpdateProfileSuccess (obj) {
    return {
        type: TYPES.PROFILE_OBJ_SUCCESS,
        obj,
    }
}

export function UpdateProfileClear () {
    return {
        type: TYPES.PROFILE_OBJ_CLEAR,
    }
}

export const updateProfileObj = (params) => {
    // console.log('[updateProfileObj.js] collect obj', params);
    return async dispatch => {
        dispatch(UpdateProfileObjTrackScreen())
        try {
            dispatch(UpdateProfileSuccess(params))
        } catch (error) {
            dispatch(UpdateProfileClear())
        }
    }    
}

//Create UpdateProfile Object Action
export function updateprofileRequest () {
    return {
        type: TYPES.PROFILE_REQUEST,
    }
}

export function updateprofileSuccess (data) {
    return {
        type: TYPES.PROFILE_SUCCESS,
        data,
    }
}

export function updateprofileFailure (error) {
    return {
        type: TYPES.PROFILE_FAILURE,
        error
    }
}

export const updateProfile = (params) => {
    // console.log('[updateProfile.js] Params obj', params);
    return async dispatch => {
        dispatch(updateprofileRequest())
        try {
            let response = await Api.putAxios(endPoints.updateProfileInfo ,params)
            // console.log('[updateProfile-actions] updateProfile success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(updateprofileSuccess(response))
                // console.log('[updateProfile-actions] updateProfile success case', response);
            } else {
                // console.log('[updateProfile-action] updateProfile failure response ', response);
                dispatch(updateprofileFailure(response))
            } 
        } catch (error) {
            // console.log('[updateProfile-action] updateProfile failure response ', error);
            dispatch(updateprofileFailure(error))
        }
    }    
}

//Update profile pic
export function updateprofilePicRequest () {
    return {
        type: TYPES.PROFILE_PICTURE_REQUEST,
    }
}

export function updateprofilePicSuccess (data) {
    return {
        type: TYPES.PROFILE_PICTURE_SUCCESS,
        data,
    }
}

export function updateprofilePicFailure (error) {
    return {
        type: TYPES.PROFILE_PICTURE_FAILURE,
        error
    }
}

export const updateProfilePic = (params) => {
    // console.log('[updateProfilePic.js] Params obj', params);
    return async dispatch => {
        dispatch(updateprofilePicRequest())
        try {
            let response = await Api.postAxios(endPoints.updateProfileImage ,params)
            // console.log('[updateProfilePic-actions] updateProfilePic success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(updateprofilePicSuccess(response))
                // console.log('[updateProfilePic-actions] updateProfilePic success case', response);
            } else {
                // console.log('[updateProfilePic-action] updateProfilePic failure response ', response);
                dispatch(updateprofilePicFailure(response))
            } 
        } catch (error) {
            // console.log('[updateProfilePic-action] updateProfilePic failure response ', error);
            dispatch(updateprofilePicFailure(error))
        }
    }    
}