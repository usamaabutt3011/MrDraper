import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    walletDetailRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const walletDetailReducer = (state = initialState, actions) => {
    switch (actions.type) {        
        case TYPES.WALLET_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                walletDetailRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.WALLET_DETAILS_SUCCESS:
            console.log('[wallet-details-reducer] success reducer', actions);
            return {
                ...state,
                loading: false,
                walletDetailRes: actions,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.WALLET_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                walletDetailRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default walletDetailReducer;