import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//invitation history Action
export function invitationHistoryRequest () {
    return {
        type: TYPES.INVITATION_HISTORY_REQUEST,
    }
}

export function invitationHistorySuccess (user) {
    return {
        type: TYPES.INVITATION_HISTORY_SUCCESS,
        user,
    }
}

export function invitationHistoryFailure (error) {
    return {
        type: TYPES.INVITATION_HISTORY_FAILURE,
        error,
    }
}


export const invitationHistory = (params) => {
    return async dispatch => {
        dispatch(invitationHistoryRequest());
            try {
                Api.postAxios(endPoints.invitationHistory ,params).then(response =>{
                    if (response.isSuccess && response.statusCode === 200) {
                        dispatch(invitationHistorySuccess(response))
                        console.log('[invitation-history-action] invitationHistory success case', response);
                    } else {
                        dispatch(invitationHistoryFailure(response))
                        console.log('[invitation-history-action] invitationHistory failure response', response);
                    }   
                })
            } catch (error) {
                dispatch(invitationHistoryFailure(error))
            }
    }
}

//Send Invitation Action
export function invitationRequest () {
    return {
        type: TYPES.INVITATION_REQUEST,
    }
}

export function invitationSuccess (user) {
    return {
        type: TYPES.INVITATION_SUCCESS,
        user,
    }
}

export function invitationFailure (error) {
    return {
        type: TYPES.INVITATION_FAILURE,
        error,
    }
}


export const invitationSend = (params) => {
    return async dispatch => {
        dispatch(invitationRequest());
            try {
                Api.postAxios(endPoints.invitationSend ,params).then(response =>{
                    if (response.isSuccess && response.statusCode === 200) {
                        dispatch(invitationSuccess(response))
                        console.log('[invitation-action] invitation success case', response);
                    } else {
                        dispatch(invitationFailure(response))
                        console.log('[invitation-action] invitation response', response);
                    }   
                })
            } catch (error) {
                dispatch(invitationHistoryFailure(error))
            }
    }
}