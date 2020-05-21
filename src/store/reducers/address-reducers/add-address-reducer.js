import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    scheduleQuizRes: null,
    newAddressList: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const addAddressReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.ADD_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                newAddressList: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.ADD_ADDRESS_SUCCESS:
            console.log('[scheduleQuiz-reducer] Object collection reducer', actions.data);
            return {
                ...state,
                loading: false,
                newAddressList: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.ADD_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                newAddressList: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default addAddressReducer;
