import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//=======================================================================================================
//MySizes Object Action
export function MySizesObjTrackScreen (screen) {
    return {
        type: TYPES.MY_SIZES_OBJ_TRACK,
        screen
    }
}

export function MySizesObjSuccess (obj) {
    return {
        type: TYPES.MY_SIZES_OBJ_SUCCESS,
        obj,
    }
}

export function MySizesObjClear () {
    return {
        type: TYPES.MY_SIZES_OBJ_CLEAR,
    }
}

export const mySizesObj = (params) => {
    console.log('[MySizes.js] Params obj', params);
    return async dispatch => {
        dispatch(MySizesObjTrackScreen())
        try {
            dispatch(MySizesObjSuccess(params))
        } catch (error) {
            dispatch(MySizesObjClear())
        }
    }    
}

//=======================================================================================================
//Create SignUp Object Action
export function mySizesRequest () {
    return {
        type: TYPES.MY_SIZES_REQUEST,
    }
}

export function mySizesSuccess (data) {
    return {
        type: TYPES.MY_SIZES_SUCCESS,
        data,
    }
}

export function mySizesFailure (error) {
    return {
        type: TYPES.MY_SIZES_FAILURE,
        error
    }
}

export const updateSizes = (params) => {
    console.log('[updateSizes.js] Params obj', params);
    return async dispatch => {
        dispatch(mySizesRequest())
        try {
            let response = await Api.putAxios(endPoints.updateSizes ,params)
            console.log('[updateSizes-actions] updateSizes success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(mySizesSuccess(response))
                console.log('[updateSizes-actions] updateSizes success case', response);
            } else {
                console.log('[updateSizes-action] updateSizes failure response ', response);
                dispatch(mySizesFailure(response))
            } 
        } catch (error) {
            console.log('[updateSizes-action] updateSizes failure response ', error);
            dispatch(mySizesFailure(error))
        }
    }    
}
