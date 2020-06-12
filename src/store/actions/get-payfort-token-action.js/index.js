import * as TYPES from '../types';
import Api from '../../../services/api';
import { endPoints } from '../../../services';
import { getPayFortDeviceId } from "@logisticinfotech/react-native-payfort-sdk/PayFortSDK/PayFortSDK";
import axios from 'axios';
//=======================================================================================================
//Token generate
export function getPayFortTokenLoading() {
    return {
        type: TYPES.GET_TOKEN_REQUEST,
    }
}

export function getPayFortTokenSuccess(data) {
    return {
        type: TYPES.GET_TOKEN_SUCCESS,
        data,
    }
}

export function getPayFortTokenFailure(error) {
    return {
        type: TYPES.GET_TOKEN_FAILURE,
        error
    }
}

export const getPayFortToken = () => {
    return async dispatch => {
        dispatch(getPayFortTokenLoading())
        try {
            getPayFortDeviceId().then(async (deviceId) => {
                console.log('deviceId=============-------:',deviceId);
                await axios.post(endPoints.sdkToken,{ device_id: deviceId })   
                    .then((response) => {
                        console.log('SUCCESS!!', response);
                        dispatch(getPayFortTokenSuccess(response.data))
                        // return response.data
                    })
                    .catch((error) => {
                        console.log('FAILURE!!', error);
                        dispatch(getPayFortTokenFailure(response))
                        // return error
                    });
            });
        } catch (error) {
            console.log('[payfort-token-action] catch response ', error);
            dispatch(getPayFortTokenFailure(error))
        }
    }
}
