import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//=======================================================================================================
//Update Size&Fit Object Action
export function updateObjTrackScreen (screen) {
    return {
        type: TYPES.UPDATE_OBJ_TRACK,
        screen
    }
}

export function updateObjSuccess (obj) {
    return {
        type: TYPES.UPDATE_OBJ_SUCCESS,
        obj,
    }
}

export function updateObjClear () {
    return {
        type: TYPES.UPDATE_OBJ_CLEAR,
    }
}

export const UpdateSizeFitObj = (params) => {
    return async dispatch => {
        dispatch(updateObjTrackScreen())
        try {
            dispatch(updateObjSuccess(params))
        } catch (error) {
            dispatch(updateObjClear())
        }
    }    
}

//=======================================================================================================
//Update Size&Fit Action
export function updateLoading () {
    return {
        type: TYPES.UPDATE_REQUEST_LOADING,
    }
}

export function updateSuccess (data) {
    return {    
        type: TYPES.UPDATE_REQUEST_SUCCESS,
        data,
    }
}

export function updateFailure (error) {
    return {
        type: TYPES.UPDATE_REQUEST_FAILURE,
        error
    }
}

export const updateSizeFitRequest = (params) => {
    return async dispatch => {
        dispatch(updateLoading())
        try {
            let response = await Api.putAxios(endPoints.updateUserSizes ,params)
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(updateSuccess(response))
            } else {
                dispatch(updateFailure(response))
            } 
        } catch (error) {
            dispatch(updateFailure(error))
        }
    }    
}