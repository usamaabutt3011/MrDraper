import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    mySizesObj: {
        "user_id": "",
        "shirt_size": "",                                                   //"S",
        "shoe_size": "",                                                    //"42",
        "waist_size": "",                                                   //"32",
        "blazer_size": "",                                                  //"No idea",
        "height": "",                                                       //"173",
        "weight": "",                                                       //"72",
    },
    mySizesRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const updateSizesReducer = (state = initialState, actions) => {
    switch (actions.type) {        
        case TYPES.MY_SIZES_OBJ_TRACK:
            return {
                ...state,
                loading: true,
                // mySizesObj: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MY_SIZES_OBJ_SUCCESS:
            console.log('[update-sizes-reducer] Object collection reducer', actions.obj);
            return {
                ...state,
                loading: false,
                mySizesObj: actions.obj,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MY_SIZES_OBJ_CLEAR:
            return {
                ...state,
                loading: false,
                mySizesObj: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        case TYPES.MY_SIZES_REQUEST:
            return {
                ...state,
                loading: true,
                mySizesRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MY_SIZES_SUCCESS:
            console.log('[update-sizes-reducer] success reducer', actions.data);
            return {
                ...state,
                loading: false,
                mySizesRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.MY_SIZES_FAILURE:
            return {
                ...state,
                loading: false,
                // mySizesObj: null,
                mySizesRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default updateSizesReducer;