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
    console.log('[myPackagesList.js] Params obj', params);
    return async dispatch => {
        dispatch(myPackagesLoading())
        try {
            let response = await Api.postAxios(endPoints.packagesList ,params)
            console.log('[myPackagesList-actions] myPackagesList success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(myPackagesSuccess(response))
                console.log('[myPackagesList-actions] myPackagesList success case', response);
            } else {
                console.log('[myPackagesList-action] myPackagesList failure response ', response);
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
    console.log('[myPackagesDetail.js] Params obj', params);
    return async dispatch => {
        dispatch(packageDetailLoading())
        try {
            let response = await Api.postAxios(endPoints.packageDetail ,params)
            console.log('[myPackagesDetail-actions] myPackagesDetail case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(packageDetailSuccess(response))
                console.log('[myPackagesDetail-actions] myPackagesDetail success case', response);
            } else {
                console.log('[myPackagesDetail-action] myPackagesDetail failure response ', response);
                dispatch(packageDetailFailure(response))
            } 
        } catch (error) {
            dispatch(packageDetailFailure(error))
        }
    }    
}