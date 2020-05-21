import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    screen: "",
    signUpObj: {
        "email": "",                                                        //"john@example.com",
        "first_name": "",                                                   //"John",
        "last_name": "",                                                    //"Smith",
        "phone": "",                                                        //"+971501234567",
        "shirts_budget": "",                                                //"200-400",
        "jeans_budget": "",                                                 //"300-500",
        "shoes_budget": "",                                                 //"expensive",
        "blazers_budget": "",                                               //"expensive",
        "shirt_size": "",                                                   //"S",
        "shoe_size": "",                                                    //"42",
        "waist_size": "",                                                   //"32",
        "blazer_size": "",                                                  //"No idea",
        "work_wear": "",                                                    //"Business Casual",
        "weekend_wear": "",                                                 //"Trendy",
        "nightout_wear": "",                                                //"Casual",
        "profession": "",                                                   //"Engineer",
        "brands": [],                                                       //["Scotch and Soda", "Hackett", "Tommy Hilfiger"],
        "birthday": "",                                                     //"1990/11/20",
        "height": "",                                                       //"173",
        "weight": "",                                                       //"72",
        "stylist_email": "",                                                //"kate@mrdraper.ae"
    },
    signupRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const signUpReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.SIGNUP_OBJ_TRACK:
            // console.log('[signup-reducer] Screens======:', actions.screen);
            return {
                ...state,
                loading: false,
                screen: actions.screen,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.SIGNUP_OBJ_SUCCESS:
            // console.log('[signup-reducer] Object collection reducer', actions.obj);
            return {
                ...state,
                loading: false,
                signUpObj: actions.obj,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.SIGNUP_OBJ_CLEAR:
            return {
                ...state,
                loading: false,
                signUpObj: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        case TYPES.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                signupRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.SIGNUP_SUCCESS:
            // console.log('[signup-reducer] Object collection reducer', actions.data);
            return {
                ...state,
                loading: false,
                signupRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                // signUpObj: null,
                signupRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default signUpReducer;