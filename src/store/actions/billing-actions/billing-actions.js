import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//=======================================================================================================
//Create Billing
export function billingLoading() {
  return {
    type: TYPES.BILLING_TRACK,
  }
}

export function billingSuccess(data) {
  return {
    type: TYPES.BILLING_SUCCESS,
    data,
  }
}

export function billingFailure(error) {
  return {
    type: TYPES.BILLING_FAILURE,
    error
  }
}

export const AddPaymentCard = (params) => {
  console.log('[billing-actions.js] Params obj', params);
  return async dispatch => {
    // dispatch(billingLoading())
    try {
      let response = await Api.postAxios(endPoints.saveCard, params);
      if (response.isSuccess && response.statusCode === 200) {
        dispatch(billingSuccess(response))
        console.log('[billing-action] success case!!!!!!!!!', response);
      } else {
        console.log('[Billing-action] failure response ', response);
        dispatch(billingFailure(response))
      }
    } catch (error) {
      console.log('[billing-action] catch response ', error);
      dispatch(billingFailure(error))
    }
  }
}

//=======================================================================================================
//get Billing Details
export function getbillingLoading() {
  return {
    type: TYPES.GET_BILLING_REQUEST,
  }
}

export function getbillingSuccess(data) {
  return {
    type: TYPES.GET_BILLING_SUCCESS,
    data,
  }
}

export function getbillingFailure(error) {
  return {
    type: TYPES.GET_BILLING_FAILURE,
    error
  }
}

export const getPaymentDetails = (params) => {
  console.log('[get-billing-actions.js] Params obj', params);
  return async dispatch => {
    // dispatch(billingLoading())
    try {
      let response = await Api.postAxios(endPoints.getCardDetails, params);
      if (response.isSuccess && response.statusCode === 200) {
        dispatch(getbillingSuccess(response))
        console.log('[get-billing-action] success case!!!!!!!!!', response);
      } else {
        console.log('[get-Billing-action] failure response ', response);
        dispatch(getbillingFailure(response))
      }
    } catch (error) {
      console.log('[get-billing-action] catch response ', error);
      dispatch(getbillingFailure(error))
    }
  }
}
