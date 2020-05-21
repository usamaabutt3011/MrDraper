import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    updateProfileObj: {
        "user_id": "",
        "first_name": "",
        "last_name": "",
        "phone": "",
        "contact_preference": "",
        "how_did_you_hear": ""
    },
    updateProfileRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const updateProfileReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.PROFILE_OBJ_TRACK:
            return {
                ...state,
                loading: true,
                // updateProfileObj: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.PROFILE_OBJ_SUCCESS:
            // console.log('[update-reducer] Object reducer', actions.obj);
            return {
                ...state,
                loading: false,
                updateProfileObj: actions.obj,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.PROFILE_OBJ_CLEAR:
            return {
                ...state,
                loading: false,
                updateProfileObj: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        case TYPES.PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                updateProfileRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.PROFILE_SUCCESS:
            // console.log('[update-profile-reducer] Object collection reducer', actions.data);
            return {
                ...state,
                loading: false,
                updateProfileRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                updateProfileRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default updateProfileReducer;