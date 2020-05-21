import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//Add Address Action
export function addAddressObjTrackScreen(screen) {
    return {
        type: TYPES.ADD_ADDRESS_OBJ_TRACK,
        screen
    }
}

export function addAddressObjSuccess(obj) {
    return {
        type: TYPES.ADD_ADDRESS_OBJ_SUCCESS,
        obj,
    }
}

export function addAddressObjClear() {
    return {
        type: TYPES.ADD_ADDRESSZ_OBJ_CLEAR,
    }
}

export const addAddressObj = (params) => {
    console.log('[addAddressObj.js] collect obj', params);
    return async dispatch => {
        dispatch(addAddressObjTrackScreen())
        try {
            dispatch(addAddressObjSuccess(params))
        } catch (error) {
            dispatch(addAddressObjClear())
        }
    }
}

//=======================================================================================================
//Add Address Action
export function addAddressRequest() {
    return {
        type: TYPES.ADD_ADDRESS_REQUEST,
    }
}

export function addAddressSuccess(data) {
    return {
        type: TYPES.ADD_ADDRESS_SUCCESS,
        data,
    }
}

export function addAddressFailure(error) {
    return {
        type: TYPES.ADD_ADDRESS_FAILURE,
        error,
    }
}

export const addAddress = (params) => {
    return async dispatch => {
        dispatch(addAddressRequest());
        try {
            Api.postAxios(endPoints.addAddress, params).then(response => {
                if (response.isSuccess && response.statusCode === 200) {
                    dispatch(addAddressSuccess(response))
                    console.log('[add-address-actions] addAddress success case', response);
                } else {
                    dispatch(addAddressFailure(response))
                    console.log('[add-address-action] addAddress failure response ', response);
                }
            })
        } catch (error) {
            dispatch(addAddressFailure(error))
        }
    }
}

//=======================================================================================================
//Remove Address Action
export function removeAddressRequest() {
    return {
        type: TYPES.REMOVE_ADDRESS_REQUEST,
    }
}

export function removeAddressSuccess(data) {
    return {
        type: TYPES.REMOVE_ADDRESS_SUCCESS,
        data,
    }
}

export function removeAddressFailure(error) {
    return {
        type: TYPES.REMOVE_ADDRESS_FAILURE,
        error,
    }
}

export const removeAddress = (params) => {
    return async dispatch => {
        dispatch(removeAddressRequest());
        try {
            Api.postAxios(endPoints.removeAddress, params).then(response => {
                if (response.isSuccess && response.statusCode === 200) {
                    dispatch(removeAddressSuccess(response))
                    console.log('[remove-address-actions] removeAddress success case', response);
                } else {
                    dispatch(removeAddressFailure(response))
                    console.log('[remove-address-action] removeAddress failure response ', response);
                }
            })
        } catch (error) {
            dispatch(removeAddressFailure(error))
        }
    }
}

//=======================================================================================================
//Update Address Action
export function editAddressRequest() {
    return {
        type: TYPES.EDIT_ADDRESS_REQUEST,
    }
}

export function editAddressSuccess(data) {
    return {
        type: TYPES.EDIT_ADDRESS_SUCCESS,
        data,
    }
}

export function editAddressFailure(error) {
    return {
        type: TYPES.EDIT_ADDRESS_FAILURE,
        error,
    }
}

export const editAddress = (params) => {
    return async dispatch => {
        dispatch(editAddressRequest());
        console.log('[edit-address-actions] params', params);
        try {
            Api.postAxios(endPoints.editAddress, params).then(response => {
                if (response.isSuccess && response.statusCode === 200) {
                    dispatch(editAddressSuccess(response))
                    console.log('[edit-address-actions] editAddress success case', response);
                } else {
                    dispatch(editAddressFailure(response))
                    console.log('[edit-address-action] editAddress failure response ', response);
                }
            })
        } catch (error) {
            dispatch(editAddressFailure(error))
        }
    }
}