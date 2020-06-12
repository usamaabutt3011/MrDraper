import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  payfortToken: null,
  error: null,
  isSuccess: false,
  isFailure: false
}

const getTokenReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false
      }
    case TYPES.GET_TOKEN_SUCCESS:
      console.log('[token-reducer] success', actions.data);
      return {
        ...state,
        loading: false,
        payfortToken: actions.data,
        isSuccess: true,
        isFailure: false,
        error: null,
      }
    case TYPES.GET_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        payfortToken: null,
        error: actions.error,
        isSuccess: false,
        isFailure: true
      }
    default:
      return state
  }
}
export default getTokenReducer;