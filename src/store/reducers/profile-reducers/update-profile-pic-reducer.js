import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    updateProfilePicRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const updateProfilePicReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.PROFILE_PICTURE_REQUEST:
            return {
                ...state,
                loading: true,
                updateProfilePicRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.PROFILE_PICTURE_SUCCESS:
            console.log('[update-profile-pic-reducer] reducer', actions.data);
            return {
                ...state,
                loading: false,
                updateProfilePicRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.PROFILE_PICTURE_FAILURE:
            return {
                ...state,
                loading: false,
                updateProfilePicRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default updateProfilePicReducer;