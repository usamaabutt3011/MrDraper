import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    invitationRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const invitationReducer = (state = initialState, actions) => {
    switch (actions.type) {        
        case TYPES.INVITATION_REQUEST:
            return {
                ...state,
                loading: true,
                invitationRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.INVITATION_SUCCESS:
            console.log('[invitation-send-reducer] success reducer', actions);
            return {
                ...state,
                loading: false,
                invitationRes: actions,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.INVITATION_FAILURE:
            return {
                ...state,
                loading: false,
                invitationRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default invitationReducer;