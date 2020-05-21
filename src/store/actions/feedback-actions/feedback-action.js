import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//Email Validation Action
export function feedbackRequest () {
    return {
        type: TYPES.FEED_BACK_REQUEST,
    }
}

export function feedbackSuccess (user) {
    return {
        type: TYPES.FEED_BACK_SUCCESS,
        user,
    }
}

export function feedbackFailure (error) {
    return {
        type: TYPES.FEED_BACK_FAILURE,
        error,
    }
}


export const submitFeedback = (params) => {
    return async dispatch => {
        dispatch(feedbackRequest());
            try {
                Api.postAxios(endPoints.submitFeedback ,params).then(response =>{
                    if (response.isSuccess && response.statusCode === 200) {
                        dispatch(feedbackSuccess(response))
                        console.log('[feedback-actions] submitFeedback success case', response);
                    } else {
                        dispatch(feedbackFailure(response))
                        console.log('[feedback-action] submitFeedback failure response', response);
                    }   
                })
            } catch (error) {
                dispatch(feedbackFailure(error))
            }
    }
}