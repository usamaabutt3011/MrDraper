import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//Wallet Details Action
export function walletDetailsRequest() {
    return {
        type: TYPES.WALLET_DETAILS_REQUEST,
    }
}

export function walletDetailsSuccess(user) {
    return {
        type: TYPES.WALLET_DETAILS_SUCCESS,
        user,
    }
}

export function walletDetailsFailure(error) {
    return {
        type: TYPES.WALLET_DETAILS_FAILURE,
        error,
    }
}


export const walletDetail = (params) => {
    return async dispatch => {
        dispatch(walletDetailsRequest());
        try {
            Api.postAxios(endPoints.walletDetails, params).then(response => {
                if (response.isSuccess && response.statusCode === 200) {
                    dispatch(walletDetailsSuccess(response))
                    console.log('[wallet-details-action] walletDetail success case', response);
                } else {
                    dispatch(walletDetailsFailure(response))
                    console.log('[wallet-details-action] walletDetail failure response', response);
                }
            })
        } catch (error) {
            dispatch(walletDetailsFailure(error))
        }
    }
}

//Get Voucher Code Action
export function getVoucherCodeRequest() {
    return {
        type: TYPES.GET_VOUCHER_CODE_REQUEST,
    }
}

export function getVoucherCodeSuccess(user) {
    return {
        type: TYPES.GET_VOUCHER_CODE_SUCCESS,
        user,
    }
}

export function getVoucherCodeFailure(error) {
    return {
        type: TYPES.GET_VOUCHER_CODE_FAILURE,
        error,
    }
}


export const getVoucherCode = (params) => {
    return async dispatch => {
        dispatch(getVoucherCodeRequest());
        try {
            Api.postAxios(endPoints.claimVoucher, params).then(response => {
                if (response.isSuccess && response.statusCode === 200) {
                    dispatch(getVoucherCodeSuccess(response))
                    console.log('[get-voucher-code-action] getVoucherCode success case', response);
                } else {
                    dispatch(getVoucherCodeFailure(response))
                    console.log('[get-voucher-code-action] getVoucherCode response', response);
                }
            })
        } catch (error) {
            dispatch(getVoucherCodeFailure(error))
        }
    }
}


//Get Membership Voucher Code Action
export function getRedeemVoucherCodeRequest() {
    return {
        type: TYPES.GET_MEMBERSHIP_VOUCHER_CODE_REQUEST,
    }
}

export function getRedeemVoucherCodeSuccess(user) {
    return {
        type: TYPES.GET_MEMBERSHIP_VOUCHER_CODE_SUCCESS,
        user,
    }
}

export function getRedeemVoucherCodeFailure(error) {
    return {
        type: TYPES.GET_MEMBERSHIP_VOUCHER_CODE_FAILURE,
        error,
    }
}

export const getRedeemMembershipVoucher = (params) => {
    return async dispatch => {
        dispatch(getRedeemVoucherCodeRequest());
        try {
            Api.postAxios(endPoints.redeemMembership, params).then(response => {
                if (response.isSuccess && response.statusCode === 200) {
                    dispatch(getRedeemVoucherCodeSuccess(response))
                    console.log('[get-Redeemvoucher-code-action] getVoucherCode success case', response);
                } else {
                    dispatch(getRedeemVoucherCodeFailure(response))
                    console.log('[get-redeemvoucher-code-action] getVoucherCode response', response);
                }
            })
        } catch (error) {
            dispatch(getRedeemVoucherCodeFailure(error))
        }
    }
}