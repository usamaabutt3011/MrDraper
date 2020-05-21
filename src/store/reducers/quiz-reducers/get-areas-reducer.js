import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    areaList: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const areaListReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.AREA_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                areaList: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.AREA_LIST_SUCCESS:
            console.log('[areas-reducer] reducer screen', actions.data);
            return {
                ...state,
                loading: false,
                areaList: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.AREA_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                areaList: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default areaListReducer;
