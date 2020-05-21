import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//=======================================================================================================
//My Packages Action
export function myPackagesLoading () {
    return {
        type: TYPES.MY_PACKAGE_REQUEST,
    }
}

export function myPackagesSuccess (data) {
    return {    
        type: TYPES.MY_PACKAGE_REQUEST_SUCCESS,
        data,
    }
}

export function myPackagesFailure (error) {
    return {
        type: TYPES.MY_PACKAGE_REQUEST_FAILURE,
        error
    }
}

export const myPackagesList = (params) => {
    return async dispatch => {
        dispatch(myPackagesLoading())
        try {
            let response = await Api.postAxios(endPoints.packagesList ,params)
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(myPackagesSuccess(response))
            } else {
                dispatch(myPackagesFailure(response))
            } 
        } catch (error) {
            dispatch(myPackagesFailure(error))
        }
    }    
}

//=======================================================================================================
//My Package Detail Action
export function packageDetailLoading () {
    return {
        type: TYPES.MY_PACKAGE_DETAIL_REQUEST,
    }
}

export function packageDetailSuccess (data) {
    return {    
        type: TYPES.MY_PACKAGE_DETAIL_REQUEST_SUCCESS,
        data,
    }
}

export function packageDetailFailure (error) {
    return {
        type: TYPES.MY_PACKAGE_DETAIL_REQUEST_FAILURE,
        error
    }
}

export const myPackagesDetail = (params) => {
    return async dispatch => {
        dispatch(packageDetailLoading())
        try {
            let response = await Api.postAxios(endPoints.packageDetail ,params)
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(packageDetailSuccess(response))
            } else {
                dispatch(packageDetailFailure(response))
            } 
        } catch (error) {
            dispatch(packageDetailFailure(error))
        }
    }    
}