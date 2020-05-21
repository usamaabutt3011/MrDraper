import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//Change Password Action
export function changePasswordRequest () {
    return {
        type: TYPES.CHANGE_PASSWORD_REQUEST,
    }
}

export function changePasswordSuccess (data) {
    return {
        type: TYPES.CHANGE_PASSWORD_SUCCESS,
        data,
    }
}

export function changePasswordFailure (error) {
    return {
        type: TYPES.CHANGE_PASSWORD_FAILURE,
        error
    }
}

export const changePassword = (params) => {
    console.log('[changePassword.js] Params obj', params);
    return async dispatch => {
        dispatch(changePasswordRequest())
        try {
            let response = await Api.postAxios(endPoints.changePassword ,params)
            console.log('[changePassword-actions] changePassword success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(changePasswordSuccess(response))
                console.log('[changePassword-actions] changePassword success case', response);
            } else {
                console.log('[changePassword-action] changePassword failure response ', response);
                dispatch(changePasswordFailure(response))
            } 
        } catch (error) {
            console.log('[updateProfile-action] updateProfile failure response ', error);
            dispatch(changePasswordFailure(error))
        }
    }    
}
