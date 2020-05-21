import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    myPackagesRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const myPackagesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.MY_PACKAGE_REQUEST:
            return {
                ...state,
                loading: true,
                myPackagesRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MY_PACKAGE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                myPackagesRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.MY_PACKAGE_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                myPackagesRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}

export default myPackagesReducer;
