import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//=======================================================================================================
//MySizes Object Action
export function MyPreferencesObjTrackScreen (screen) {
    return {
        type: TYPES.MY_PREFERENCES_OBJ_TRACK,
        screen
    }
}

export function MyPreferencesObjSuccess (obj) {
    return {
        type: TYPES.MY_PREFERENCES_OBJ_SUCCESS,
        obj,
    }
}

export function MyPreferencesObjClear () {
    return {
        type: TYPES.MY_PREFERENCES_OBJ_CLEAR,
    }
}

export const myPreferencesObj = (params) => {
    console.log('[myPreferencesObj.js] Params obj', params);
    return async dispatch => {
        dispatch(MyPreferencesObjTrackScreen())
        try {
            dispatch(MyPreferencesObjSuccess(params))
        } catch (error) {
            dispatch(MyPreferencesObjClear())
        }
    }    
}

//=======================================================================================================
//Create SignUp Object Action
export function myPreferencesRequest () {
    return {
        type: TYPES.MY_PREFERENCES_REQUEST,
    }
}

export function myPreferencesSuccess (data) {
    return {
        type: TYPES.MY_PREFERENCES_SUCCESS,
        data,
    }
}

export function myPreferencesFailure (error) {
    return {
        type: TYPES.MY_PREFERENCES_FAILURE,
        error
    }
}

export const updatePreferences = (params) => {
    console.log('[updatePreferences.js] Params obj', params);
    return async dispatch => {
        dispatch(myPreferencesRequest())
        try {
            let response = await Api.putAxios(endPoints.updatePreferences ,params)
            console.log('[updatePreferences-actions] updatePreferences success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(myPreferencesSuccess(response))
                console.log('[updatePreferences-actions] updatePreferences success case', response);
            } else {
                console.log('[updatePreferences-action] updatePreferences failure response ', response);
                dispatch(myPreferencesFailure(response))
            } 
        } catch (error) {
            console.log('[updatePreferences-action] updatePreferences failure response ', error);
            dispatch(myPreferencesFailure(error))
        }
    }    
}
