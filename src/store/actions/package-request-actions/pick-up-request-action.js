import * as TYPES from '../types';
import Api from '../../../services/api'
import axios from 'axios';
import { endPoints } from '../../../services'

//=======================================================================================================
//Pickup Request Action
export function pickUpRequestLoading () {
    return {
        type: TYPES.PICK_UP_REQUEST,
    }
}

export function pickUpRequestSuccess (data) {
    return {    
        type: TYPES.PICK_UP_REQUEST_SUCCESS,
        data,
    }
}

export function pickUpRequestFailure (error) {
    return {
        type: TYPES.PICK_UP_REQUEST_FAILURE,
        error
    }
}

export const pickUpRequest = (params) => {
    return async dispatch => {
        dispatch(pickUpRequestLoading())
        try {
            // let response = await Api.postAxios(endPoints.pickUpRequest ,params)
            axios.post(`http://46.101.224.217/members/request_pickup_submit_feedback_new`,
                params,
            )   
                .then((response) => {
                    console.log('SUCCESS!!', response);
                    if (response.data && response.data.status ) {
                        dispatch(pickUpRequestSuccess(response.data))
                    } else {
                        dispatch(pickUpRequestFailure(response.data))
                    } 
                })
                .catch((error) => {
                    console.log('FAILURE!!', error);
                    dispatch(pickUpRequestFailure(error))
                });
        } catch (error) {
            dispatch(pickUpRequestFailure(error))
        }
    }    
}