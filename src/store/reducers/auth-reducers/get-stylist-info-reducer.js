import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    stylistInfo: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const loginReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.STYLIST_INFO_REQUEST:
            return {
                ...state,
                loading: true,
                stylistInfo: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.STYLIST_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                stylistInfo: actions.user,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.STYLIST_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                stylistInfo: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default loginReducer;
