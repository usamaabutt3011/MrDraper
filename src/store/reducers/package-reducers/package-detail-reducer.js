import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    packageDetailRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const packageDetailReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.MY_PACKAGE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                packageDetailRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.MY_PACKAGE_DETAIL_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                packageDetailRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.MY_PACKAGE_DETAIL_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                packageDetailRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}

export default packageDetailReducer;
