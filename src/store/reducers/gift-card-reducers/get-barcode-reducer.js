import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  getBarcode: null,
  error: null,
  isSuccess: false,
  isFailure: false
}
const getBarCodeReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_BARCODE_REQUEST:
      return {
        ...state,
        loading: true,
        getBarcode: null,
        isSuccess: false,
        isFailure: false
      }
    case TYPES.GET_BARCODE_SUCCESS:
      // console.log('[getbarcode-reducer]--------:', actions.data);
      return {
        ...state,
        loading: false,
        getBarcode: actions.data,
        isSuccess: true,
        isFailure: false
      }
    case TYPES.GET_BARCODE_FAILURE:
      return {
        ...state,
        loading: false,
        // giftCardObj: null,
        getBarcode: null,
        error: actions.error,
        isSuccess: false,
        isFailure: true
      }
    default:
      return state
  }
}
export default getBarCodeReducer;