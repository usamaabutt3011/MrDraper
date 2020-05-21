import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//=======================================================================================================
//Gift Card Object Action
export function GiftCardObjTrackScreen(screen) {
  return {
    type: TYPES.GIFT_CARD_OBJ_TRACK,
    screen
  }
}

export function GiftCardObjSuccess(obj) {
  return {
    type: TYPES.GIFT_CARD_OBJ_SUCCESS,
    obj,
  }
}

export function GiftCardObjClear() {
  return {
    type: TYPES.GIFT_CARD_OBJ_CLEAR,
  }
}

export const giftCardObj = (params) => {
  console.log('[giftcard.js] collect obj', params);
  return async dispatch => {
    dispatch(GiftCardObjTrackScreen())
    try {
      dispatch(GiftCardObjSuccess(params))
    } catch (error) {
      // dispatch(SignUpObjFailure())
    }
  }
}

//=======================================================================================================
//Create GiftCard Object Action
export function giftCardRequest() {
  return {
    type: TYPES.GIFT_CARD_REQUEST,
  }
}

export function giftCardSuccess(data) {
  return {
    type: TYPES.GIFT_CARD_SUCCESS,
    data,
  }
}

export function giftCardFailure(error) {
  return {
    type: TYPES.GIFT_CARD_FAILURE,
    error
  }
}

export const createGiftCard = (params) => {
  console.log('[giftcard.js] Params obj', params);
  return async dispatch => {
    dispatch(giftCardRequest())
    try {
      let getResponse = await Api.getAxios(endPoints.initiateGiftCard, params);
      if (getResponse.isSuccess && getResponse.statusCode === 200) {
        params.barcode = getResponse.result.barcode;
        let response = await Api.postAxios(endPoints.updateGiftCard, params)
        console.log('[gift-card-action] createGiftCard success case', response);
        if (response.isSuccess && response.statusCode === 200) {
          dispatch(giftCardSuccess(response))
          console.log('[gift-card-action] createGiftCard success case!!!!!!!!!', response);
        } else {
          console.log('[gift-card-action] createGiftCard failure response ', response);
          dispatch(giftCardFailure(response))
        }
      } else {
        dispatch(giftCardFailure(getResponse))
      }
    } catch (error) {
      console.log('[gift-card-action] createGiftCard failure response ', error);
      dispatch(giftCardFailure(error))
    }
  }
}

