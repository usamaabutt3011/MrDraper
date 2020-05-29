import * as TYPES from '../../actions/types';

const initialState = {
    isShow: false,
    isShowFaceID: false,
    isLoggedIn: false,
    credentials: null
}
const settingReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.BIOMETRIC_LOGIN_SETTINGS:
            return {
                ...state,
                isLoggedIn: true,
                credentials: actions.data,
            }
        case TYPES.BIOMETRIC_ICON_SHOW:
            console.log('[app-setting-reducer] success reducer', actions);
            return {
                ...state,
                isShow: true,
                isShowFaceID: false,
            }
        case TYPES.BIOMETRIC_ICON_HIDE:
            console.log('[app-setting-reducer] success reducer', actions);
            return {
                ...state,
                isShow: false,
            }
        case TYPES.FACE_ID_ICON_SHOW:
            console.log('[face-reducer] success reducer', actions);
            return {
                ...state,
                isShowFaceID: true,
                isShow: false,
            }
        case TYPES.FACE_ID_ICON_HIDE:
            console.log('[face-reducer] success reducer', actions);
            return {
                ...state,
                isShowFaceID: false,
            }
        case TYPES.SIGNUP_SUCCESS:
            return {
                isShow: false,
                isShowFaceID: false,
                isLoggedIn: false,
                credentials: null
            }
        default:
            return state
    }
}
export default settingReducer;