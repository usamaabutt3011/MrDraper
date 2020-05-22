import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  billingDetails: null,
  error: null,
  isSuccess: false,
  isFailure: false
}

const billingDetailReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_BILLING_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false
      }
    case TYPES.GET_BILLING_SUCCESS:
      console.log('[billing-details-reducer] success', actions.data);
      return {
        ...state,
        loading: false,
        billingDetails: actions.data,
        isSuccess: true,
        isFailure: false,
        error: null,
      }
    case TYPES.GET_BILLING_FAILURE:
      return {
        ...state,
        loading: false,
        billingDetails: null,
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
export default billingDetailReducer;