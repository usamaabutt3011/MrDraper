import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    getMembershipVoucherRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const getMembershipVoucherReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.GET_MEMBERSHIP_VOUCHER_CODE_REQUEST:
            return {
                ...state,
                loading: true,
                getMembershipVoucherRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.GET_MEMBERSHIP_VOUCHER_CODE_SUCCESS:
            console.log('[get-membership-voucher-code-reducer] success reducer', actions);
            return {
                ...state,
                loading: false,
                getMembershipVoucherRes: actions,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.GET_MEMBERSHIP_VOUCHER_CODE_FAILURE:
            return {
                ...state,
                loading: false,
                getMembershipVoucherRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default getMembershipVoucherReducer;