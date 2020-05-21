import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    invitationHitoryRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const invitationHistoryReducer = (state = initialState, actions) => {
    switch (actions.type) {        
        case TYPES.INVITATION_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
                invitationHitoryRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.INVITATION_HISTORY_SUCCESS:
            console.log('[invitation-history-reducer] success reducer', actions);
            return {
                ...state,
                loading: false,
                invitationHitoryRes: actions,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.INVITATION_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
                invitationHitoryRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default invitationHistoryReducer;