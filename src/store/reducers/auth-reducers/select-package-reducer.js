import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    selectedPackage: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const selectPackageReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.SUBMIT_PACKAGE_REQUEST:
            return {
                ...state,
                loading: true,
                selectedPackage: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.SUBMIT_PACKAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedPackage: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.SUBMIT_PACKAGE_FAILURE:
            return {
                ...state,
                loading: false,
                selectedPackage: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}

export default selectPackageReducer;
