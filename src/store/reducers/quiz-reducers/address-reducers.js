import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    addressList: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const addressesList = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.ADDRESS_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                addressList: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.ADDRESS_LIST_SUCCESS:
            console.log('[address-reducer] Object collection reducer', actions.data);
            return {
                ...state,
                loading: false,
                addressList: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.ADDRESS_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                addressList: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default addressesList;
//API params
// {
// 	"user_id": "8",
// }
//API response
// {
//     "statusCode": 200,
//     "isSuccess": true,
//     "message": "User address list",
//     "result": [
//         {
//             "id": 7600,
//             "line_1": "test Building",
//             "line_2": "123",
//             "home": true,
//             "area_id": 100,
//             "is_default": true,
//             "created_at": "2020-01-23T06:38:19.569Z",
//             "updated_at": "2020-01-23T06:38:19.569Z",
//             "user_id": 8,
//             "address_count": null,
//             "area": "Downtown Burj Khalifa",
//             "city": "Dubai",
//             "address_entry_id": 7600
//         }
//     ]
// }