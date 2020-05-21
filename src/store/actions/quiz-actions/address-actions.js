import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//ScheduleQuiz Action
export function addressRequest () {
    return {
        type: TYPES.ADDRESS_LIST_REQUEST,
    }
}

export function addressSuccess (data) {
    return {
        type: TYPES.ADDRESS_LIST_SUCCESS,
        data,
    }
}

export function addressFailure (error) {
    return {
        type: TYPES.ADDRESS_LIST_FAILURE,
        error,
    }
}


export const addressList = (params) => {
    console.log('[addressList params]', params);
    return async dispatch => {
        dispatch(addressRequest());
            try {
                Api.getAxios(endPoints.getAddresses ,params).then(response =>{
                    if (response.isSuccess && response.statusCode === 200) {
                        dispatch(addressSuccess(response))
                        console.log('[address-list-actions] addressList success case', response);
                    } else {
                        dispatch(addressFailure(response))
                        console.log('[address-list-action] addressList failure response ', response);
                    }   
                })
            } catch (error) {
                dispatch(addressFailure(error))
                console.log('[address-list-action] addressList failure catch ', response);
            }
    }
}
