import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    getVoucherCodeRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const getVoucherCodeReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.GET_VOUCHER_CODE_REQUEST:
            return {
                ...state,
                loading: true,
                getVoucherCodeRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.GET_VOUCHER_CODE_SUCCESS:
            console.log('[get-voucher-code-reducer] success reducer', actions);
            return {
                ...state,
                loading: false,
                getVoucherCodeRes: actions,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.GET_VOUCHER_CODE_FAILURE:
            return {
                ...state,
                loading: false,
                getVoucherCodeRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default getVoucherCodeReducer;