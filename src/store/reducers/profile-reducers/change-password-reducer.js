import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    changePassRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const changePasswordReducer = (state = initialState, actions) => {
    switch (actions.type) {        
        case TYPES.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                changePassRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.CHANGE_PASSWORD_SUCCESS:
            console.log('[change-password-reducer] success reducer', actions.data);
            return {
                ...state,
                loading: false,
                changePassRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                changePassRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default changePasswordReducer;