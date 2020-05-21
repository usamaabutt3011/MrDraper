import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    pickupRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const pickUpRequestReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.PICK_UP_REQUEST:
            return {
                ...state,
                loading: true,
                pickupRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.PICK_UP_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                pickupRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.PICK_UP_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                pickupRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}

export default pickUpRequestReducer;
