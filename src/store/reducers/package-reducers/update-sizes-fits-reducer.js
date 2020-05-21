import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    updateSizeFitObj: {
        "user_id": "",//"8",
        "shirt_size": "",//"XL",
        "shirts_fit": "",//"Regular Fit",
        "waist_size": "",//"35",
        "pants_fit": "",//"Regular Fit",
        "blazer_size": "",//"48",
        "shoe_size": "",//"44",
        "height": "",//"180",
        "weight": "",//"88"
    },
    updateSizeFitRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const updateRequestReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.UPDATE_OBJ_TRACK:
            return {
                ...state,
                loading: true,
                updateSizeFitObj: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.UPDATE_OBJ_SUCCESS:
            console.log('[update-sizes-fits-reducer] SUCCESS Object reducer', actions.obj);
            return {
                ...state,
                loading: false,
                updateSizeFitObj: actions.obj,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.UPDATE_OBJ_CLEAR:
            return {
                ...state,
                loading: false,
                updateSizeFitObj: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        case TYPES.UPDATE_REQUEST_LOADING:
            return {
                ...state,
                loading: true,
                updateSizeFitRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.UPDATE_REQUEST_SUCCESS:
            console.log('[update-sizes-fits-reducer] SUCCESS reducer', actions.obj);
            return {
                ...state,
                loading: false,
                updateSizeFitRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.UPDATE_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                updateSizeFitRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}

export default updateRequestReducer;
