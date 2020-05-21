import * as TYPES from '../types';

//AppSettings Action
export function bioLoginSettings(data) {
    return {
        type: TYPES.BIOMETRIC_LOGIN_SETTINGS,
        data
    }
}

export function showBioIcon() {
    return {
        type: TYPES.BIOMETRIC_ICON_SHOW,
    }
}

export function hideBioIcon() {
    return {
        type: TYPES.BIOMETRIC_ICON_HIDE,
    }
}

export const appSettings = (params, data) => {
    console.log('[app-setting-action] appSettings success case', params, data);
    return async (dispatch) => {
        if (params == 'login') {
            dispatch(bioLoginSettings(data))
        } else {
            if (params == 'show') {
                dispatch(showBioIcon())
            } else {
                if (params == 'hide') {
                    dispatch(hideBioIcon())
                }
            }
        }
    }
}

//AppSettings Action
export function faceLoginSettings(data) {
    return {
        type: TYPES.FACE_ID_LOGIN_SETTINGS,
        data
    }
}

export function showFaceIcon() {
    return {
        type: TYPES.FACE_ID_ICON_SHOW,
    }
}

export function hideFaceIcon() {
    return {
        type: TYPES.FACE_ID_ICON_HIDE,
    }
}

export const faceIDSettings = (params) => {
    console.log('[faceID-action] faceIDSettings success case', params);
    return async (dispatch) => {
        if (params == 'show') {
            dispatch(showFaceIcon())
        } else {
            if (params == 'hide') {
                dispatch(hideFaceIcon())
            }
        }
    }
}