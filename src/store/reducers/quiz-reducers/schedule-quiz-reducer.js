import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    scheduleQuizObj: {
        "package_send_date": "",                                                        //"Feb 27th 2020",
        "package_send_time": "",                                                        //"6pm-10pm",
        "package_send_address": "",                                                     //"Al Awir, Dubai, 23, 12",
    },
    scheduleQuizRes: null,
    selectedAddress: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const scheduleQuiz = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.SCHEDULE_QUIZ_OBJ_TRACK:
            return {
                ...state,
                loading: true,                                        
                // scheduleQuizObj: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.SCHEDULE_QUIZ_OBJ_SUCCESS:
            console.log('[SCHEDULE_QUIZ-reducer] Object collection reducer', actions.obj);
            return {
                ...state,
                loading: false,
                scheduleQuizObj: actions.obj,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.SCHEDULE_QUIZ_OBJ_CLEAR:
            return {
                ...state,
                loading: false,
                scheduleQuizObj: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        case TYPES.SCHEDULE_QUIZ_REQUEST:
            return {
                ...state,
                loading: true,
                scheduleQuizRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.SCHEDULE_QUIZ_SUCCESS:
            console.log('[scheduleQuiz-reducer] Object collection reducer', actions.data);
            return {
                ...state,
                loading: false,
                scheduleQuizRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.SCHEDULE_QUIZ_FAILURE:
            return {
                ...state,
                loading: false,
                scheduleQuizRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default scheduleQuiz;
//API params
// {
// 	"user_id": "8",
// 	"package_send_date": "Feb 27th 2020",
// 	"package_send_time": "6pm-10pm",
// 	"package_send_address": "Al Awir, Dubai, 23, 12"
// }
//API response
// {
//     "statusCode": 200,
//     "isSuccess": true,
//     "message": "Style Quiz submitted successfully.",
//     "result": null
// }