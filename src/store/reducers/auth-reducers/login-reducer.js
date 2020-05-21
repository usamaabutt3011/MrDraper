import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    userProfile: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const loginReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                userProfile: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.USER_LOGIN_SUCCESS:
            console.log('[login.js] helper reducer=====:', actions.user);
            return {
                ...state,
                loading: false,
                userProfile: actions.user,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.USER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                userProfile: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        case TYPES.SAVE_SIGNUP_REQUEST: 
            // console.log('[login.js] helper reducer=====:', actions.user);
            return {
                ...state,
                loading: false,
                userProfile: actions.user,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.LOG_OUT_REQUEST:
            return {
                ...state,
                loading: false,
                userProfile: null,
                error: null,
                isSuccess: false,
                isFailure: false
            }
        default:
            return state
    }
}
export default loginReducer;
