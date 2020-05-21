import * as TYPES from '../../actions/types';

const initialState = {
    loading: false,
    styleQuizObj: {
        "shirts_fit": "",                                                        //"Slim Fit",
        "pants_fit": "",                                                         //"Skinny Fit",
        "colors": [],                                                            //["Basic Colors"],
        "patterns": [],                                                          //["Checkered"],
        "style_or_comfort": "",                                                  //"Comfort",
        "adventurousness": "",                                                   //"Moderate",
    },
    quizRes: null,
    error: null,
    isSuccess: false,
    isFailure: false
}
const styleQuiz = (state = initialState, actions) => {
    switch (actions.type) {
        case TYPES.STYLE_QUIZ_OBJ_TRACK:
            return {
                ...state,
                loading: true,
                // styleQuizObj: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.STYLE_QUIZ_OBJ_SUCCESS:
            console.log('[STYLE_QUIZ-reducer] Object collection reducer', actions.obj);
            return {
                ...state,
                loading: false,
                styleQuizObj: actions.obj,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.STYLE_QUIZ_OBJ_CLEAR:
            return {
                ...state,
                loading: false,
                styleQuizObj: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        case TYPES.STYLE_QUIZ_REQUEST:
            return {
                ...state,
                loading: true,
                quizRes: null,
                isSuccess: false,
                isFailure: false
            }
        case TYPES.STYLE_QUIZ_SUCCESS:
            console.log('[signup-reducer] Object collection reducer', actions.data);
            return {
                ...state,
                loading: false,
                quizRes: actions.data,
                isSuccess: true,
                isFailure: false
            }
        case TYPES.STYLE_QUIZ_FAILURE:
            return {
                ...state,
                loading: false,
                quizRes: null,
                error: actions.error,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state
    }
}
export default styleQuiz;
//API params
// {
// 	"user_id": "8",
// 	"data": {
// 	 "shirts_fit": "Slim Fit", 
// 	 "pants_fit": "Skinny Fit",
// 	 "colors": ["Basic Colors"],
// 	 "patterns": ["Checkered"],
// 	 "style_or_comfort": "Comfort",
// 	 "adventurousness": "Moderate"
// 	}
// }
//API response
// {
//     "statusCode": 200,
//     "isSuccess": true,
//     "message": "Style Quiz submitted successfully.",
//     "result": null
// }