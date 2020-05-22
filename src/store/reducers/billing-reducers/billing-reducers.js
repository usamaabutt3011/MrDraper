import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  paymentCards: null,
  error: null,
  isSuccess: false,
  isFailure: false
}
const billingReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.BILLING_TRACK:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false
      }
    case TYPES.BILLING_SUCCESS:
      console.log('[billing-reducer] success', actions.obj);
      return {
        ...state,
        loading: false,
        paymentCards: actions.obj,
        isSuccess: true,
        isFailure: false,
        error: null,
      }
    case TYPES.BILLING_FAILURE:
      return {
        ...state,
        loading: false,
        paymentCards: null,
        error: actions.error,
        isSuccess: false,
        isFailure: true
      }
    case TYPES.BILLING_CLEAR:
      return Object.assign({}, state, initialState);
    default:
      return state
  }
}
export default billingReducer;