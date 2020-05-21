import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    editAddressRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const editAddressReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.EDIT_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                editAddressRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.EDIT_ADDRESS_SUCCESS:
            console.log('[editAddressRes-reducer] reducer', actions.data);
            return {
                ...state,
                loading: false,
                editAddressRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.EDIT_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                editAddressRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default editAddressReducer;
