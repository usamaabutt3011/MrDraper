import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    user: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const emailValidateReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.EMAIL_VALIDATE_REQUEST:
            return {
                ...state,
                loading: true,
                user: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.EMAIL_VALIDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: actions.user,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.EMAIL_VALIDATE_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default emailValidateReducer;
