import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  giftCardObj: {
    "amount": "",
    "recepient_name": "",
    "recepient_email": "",
    "sender_name": "",
    "sender_email": "",
    "message": "",
    "send_date": ""
  },
  giftCardRes: null,
  error: null,
  isSuccess: false,
  isFailure: false
}
const giftCardReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GIFT_CARD_OBJ_TRACK:
      return {
        ...state,
        loading: true,
        // giftCardObj: null,
        isSuccess: false,
        isFailure: false
      }
    case TYPES.GIFT_CARD_OBJ_SUCCESS:
      console.log('[signup-reducer] Object collection reducer', actions.obj);
      return {
        ...state,
        loading: false,
        giftCardObj: actions.obj,
        isSuccess: false,
        isFailure: false
      }
    case TYPES.GIFT_CARD_OBJ_CLEAR:
      // return {
      //   ...state,
      //   loading: false,
      //   giftCardObj: null,
      //   error: actions.error,
      //   isSuccess: false,
      //   isFailure: true
      // }
      return Object.assign({}, state, initialState);
    case TYPES.GIFT_CARD_REQUEST:
      return {
        ...state,
        loading: true,
        giftCardRes: null,
        isSuccess: false,
        isFailure: false
      }
    case TYPES.GIFT_CARD_SUCCESS:
      console.log('[signup-reducer] Object collection reducer', actions.data);
      return {
        ...state,
        loading: false,
        giftCardRes: actions.data,
        isSuccess: true,
        isFailure: false
      }
    case TYPES.GIFT_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        // giftCardObj: null,
        giftCardRes: null,
        error: actions.error,
        isSuccess: false,
        isFailure: true
      }
    default:
      return state
  }
}
export default giftCardReducer;