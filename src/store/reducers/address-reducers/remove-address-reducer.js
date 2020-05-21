import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    deleteAddressRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const removeAddressReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.REMOVE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                deleteAddressRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.REMOVE_ADDRESS_SUCCESS:
            console.log('[removeAddress-reducer] reducer', actions.data);
            return {
                ...state,
                loading: false,
                deleteAddressRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.REMOVE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                deleteAddressRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default removeAddressReducer;
