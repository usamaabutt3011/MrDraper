import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    myStylesObj: {
        "user_id": "",
        "work_wear": "",
        "weekend_wear": "",
        "nightout_wear": ""
    },
    myStylesRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const updateStylesReducer = (state = initialState, actions) => {
    switch (actions.type) {        
        // case TYPES.MY_SIZES_OBJ_TRACK:
        //     return {
        //         ...state,
        //         loading: true,
        //         // mySizesObj: null,
        //         isSuccess: false,
        //         isFailure: false
        //     }
        // case TYPES.MY_SIZES_OBJ_SUCCESS:
        //     console.log('[update-sizes-reducer] Object collection reducer', actions.obj);
        //     return {
        //         ...state,
        //         loading: false,
        //         mySizesObj: actions.obj,
        //         isSuccess: false,
        //         isFailure: false
        //     }
        // case TYPES.MY_SIZES_OBJ_CLEAR:
        //     return {
        //         ...state,
        //         loading: false,
        //         mySizesObj: null,
        //         error: actions.error,
        //         isSuccess: false,
        //         isFailure: true
        //     }
        case TYPES.MY_STYLES_REQUEST:
            return {
                ...state,
                loading: true,
                myStylesRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MY_STYLES_SUCCESS:
            console.log('[update-myStylesRes-reducer] success reducer', actions.data);
            return {
                ...state,
                loading: false,
                myStylesRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.MY_STYLES_FAILURE:
            return {
                ...state,
                loading: false,
                // mySizesObj: null,
                myStylesRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default updateStylesReducer;