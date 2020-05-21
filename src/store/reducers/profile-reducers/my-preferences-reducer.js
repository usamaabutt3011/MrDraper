import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    myPreferencesObj: {
        "user_id": "",
        "brands": [],                                           //["Reiss","Hackett","Ralph Lauren"],
        "jeans_budget": "",                                     //"250-500",
        "shoes_budget": "",                                     //"400-1100",
        "shirts_budget": "",                                    //"200-500",
        "blazers_budget": "",                                   //"600-1500",
        "liked_colors": "",                                     //"Pastel Colors",
        "liked_patterns": "",                                   //"Stripes",
        "pants_fit": "",                                        //"Regular Fit",
        "shirts_fit": "",                                       //"Regular Fit",
        "style_or_comfort": "",                                 //"Comfort"
    },
    myPreferencesRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const updatePreferencesReducer = (state = initialState, actions) => {
    switch (actions.type) {        
        case TYPES.MY_PREFERENCES_OBJ_TRACK:
            return {
                ...state,
                loading: true,
                // myPreferencesObj: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MY_PREFERENCES_OBJ_SUCCESS:
            console.log('[update-preferences-reducer] Object collection reducer', actions.obj);
            return {
                ...state,
                loading: false,
                myPreferencesObj: actions.obj,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MY_PREFERENCES_OBJ_CLEAR:
            return {
                ...state,
                loading: false,
                myPreferencesObj: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        case TYPES.MY_PREFERENCES_REQUEST:
            return {
                ...state,
                loading: true,
                myPreferencesRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MY_PREFERENCES_SUCCESS:
            console.log('[update-preferences-reducer] success reducer', actions.data);
            return {
                ...state,
                loading: false,
                myPreferencesRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.MY_PREFERENCES_FAILURE:
            return {
                ...state,
                loading: false,
                myPreferencesRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default updatePreferencesReducer;