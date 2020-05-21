import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    userProfile: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const megicLoginReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.MEGIC_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                userProfile: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MEGIC_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userProfile: actions.user,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.MEGIC_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                userProfile: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default megicLoginReducer;
