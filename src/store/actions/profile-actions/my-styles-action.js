import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//=======================================================================================================
//MySizes Object Action
// export function MySizesObjTrackScreen (screen) {
//     return {
//         type: TYPES.MY_SIZES_OBJ_TRACK,
//         screen
//     }
// }

// export function MySizesObjSuccess (obj) {
//     return {
//         type: TYPES.MY_SIZES_OBJ_SUCCESS,
//         obj,
//     }
// }

// export function MySizesObjClear () {
//     return {
//         type: TYPES.MY_SIZES_OBJ_CLEAR,
//     }
// }

// export const mySizesObj = (params) => {
//     console.log('[MySizes.js] Params obj', params);
//     return async dispatch => {
//         dispatch(MySizesObjTrackScreen())
//         try {
//             dispatch(MySizesObjSuccess(params))
//         } catch (error) {
//             dispatch(MySizesObjClear())
//         }
//     }    
// }

//=======================================================================================================
//Create SignUp Object Action
export function myStylesRequest () {
    return {
        type: TYPES.MY_STYLES_REQUEST,
    }
}

export function myStylesSuccess (data) {
    return {
        type: TYPES.MY_STYLES_SUCCESS,
        data,
    }
}

export function myStylesFailure (error) {
    return {
        type: TYPES.MY_STYLES_FAILURE,
        error
    }
}

export const updateStyles = (params) => {
    console.log('[updateStyles.js] Params obj', params);
    return async dispatch => {
        dispatch(myStylesRequest())
        try {
            let response = await Api.putAxios(endPoints.updateStyles ,params)
            console.log('[updateStyles-actions] updateStyles success case', response);
            if (response.isSuccess && response.statusCode === 200) {
                dispatch(myStylesSuccess(response))
                console.log('[updateStyles-actions] updateStyles success case', response);
            } else {
                console.log('[updateStyles-action] updateStyles failure response ', response);
                dispatch(myStylesFailure(response))
            } 
        } catch (error) {
            console.log('[updateStyles-action] updateStyles failure response ', error);
            dispatch(myStylesFailure(error))
        }
    }    
}
