import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    socialLinkRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const socialLinkReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.SOCIAL_LINKS_SUBMIT_REQUEST:
            return {
                ...state,
                loading: true,
                socialLinkRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.SOCIAL_LINKS_SUBMIT_SUCCESS:
            return {
                ...state,
                loading: false,
                socialLinkRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.SOCIAL_LINKS_SUBMIT_FAILURE:
            return {
                ...state,
                loading: false,
                socialLinkRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default socialLinkReducer;
