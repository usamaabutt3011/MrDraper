import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    packageRequestObj: {
        user_id: "", //"8",
        needs: [],//["Weekend wear"],
        comments: "",//"comments if any"
        package_name: "",
    },
    packageRequestRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const packageRequestReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.PACKAGE_REQUEST_OBJ_TRACK:
            return {
                ...state,
                loading: true,
                // packageRequestObj: {
                //     user_id: "",
                //     needs: [],
                //     comments: "",
                //     package_name: "",
                // },
                isSuccess: false,
                isFailure: false
            }
        case TYPES.PACKAGE_REQUEST_OBJ_SUCCESS:
            console.log('[package-request-reducer] SUCCESS Object reducer', actions.obj);
            return {
                ...state,
                loading: false,
                packageRequestObj: actions.obj,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.PACKAGE_REQUEST_OBJ_CLEAR:
            return {
                ...state,
                loading: false,
                packageRequestObj: {
                    user_id: "",
                    needs: [],
                    comments: "",
                    package_name: ""
                },
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        case TYPES.PACKAGE_REQUEST_LOADING:
            return {
                ...state,
                loading: true,
                packageRequestRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.PACKAGE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                packageRequestRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.PACKAGE_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                packageRequestRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}

export default packageRequestReducer;
