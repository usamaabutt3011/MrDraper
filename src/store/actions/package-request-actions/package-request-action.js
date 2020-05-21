import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//=======================================================================================================
//Package Object Action
export function PackageRequestObjTrackScreen (screen) {
    return {
        type: TYPES.PACKAGE_REQUEST_OBJ_TRACK,
        screen
    }
}

export function PackageRequestObjSuccess (obj) {
    return {
        type: TYPES.PACKAGE_REQUEST_OBJ_SUCCESS,
        obj,
    }
}

export function PackageRequestObjClear () {
    return {
        type: TYPES.PACKAGE_REQUEST_OBJ_CLEAR,
    }
}

export const PackageRequestObj = (params) => {
    return async dispatch => {
        dispatch(PackageRequestObjTrackScreen())
        try {
            dispatch(PackageRequestObjSuccess(params))
        } catch (error) {
            dispatch(PackageRequestObjClear())
        }
    }    
}

//=======================================================================================================
//Package Request Action
export function packageRequestLoading () {
    return {
        type: TYPES.PACKAGE_REQUEST_LOADING,
    }
}

export function packageRequestSuccess (data) {
    return {    
        type: TYPES.PACKAGE_REQUEST_SUCCESS,
        data,
    }
}

export function packageRequestFailure (error) {
    return {
        type: TYPES.PACKAGE_REQUEST_FAILURE,
        error
    }
}

export const packageRequest = (params) => {
    return async dispatch => {
        dispatch(packageRequestLoading())
        try {
            let response = await Api.postAxios(endPoints.selectPackage ,params)
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(packageRequestSuccess(response))
            } else {
                dispatch(packageRequestFailure(response))
            } 
        } catch (error) {
            dispatch(packageRequestFailure(error))
        }
    }    
}