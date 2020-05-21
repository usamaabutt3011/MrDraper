import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    resetData: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const resetPasswordReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                resetData: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                resetData: actions.user,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                resetData: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default resetPasswordReducer;
