import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    feedBackRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const feedbackReducer = (state = initialState, actions) => {
    switch (actions.type) {        
        case TYPES.FEED_BACK_REQUEST:
            return {
                ...state,
                loading: true,
                feedBackRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.FEED_BACK_SUCCESS:
            console.log('[feed-back-reducer] success reducer', actions);
            return {
                ...state,
                loading: false,
                feedBackRes: actions,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.FEED_BACK_FAILURE:
            return {
                ...state,
                loading: false,
                feedBackRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default feedbackReducer;