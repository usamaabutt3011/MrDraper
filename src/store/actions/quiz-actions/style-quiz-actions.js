import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//StyleQuiz styleQuizObj Action
export function styleQuizObjTrackScreen (screen) {
    return {
        type: TYPES.STYLE_QUIZ_OBJ_TRACK,
        screen
    }
}

export function styleQuizObjSuccess (obj) {
    return {
        type: TYPES.STYLE_QUIZ_OBJ_SUCCESS,
        obj,
    }
}

export function styleQuizObjClear () {
    return {
        type: TYPES.STYLE_QUIZ_OBJ_CLEAR,
    }
}

export const styleQuizObj = (params) => {
    console.log('[styleQuizObj.js] collect obj', params);
    return async dispatch => {
        dispatch(styleQuizObjTrackScreen())
        try {
            dispatch(styleQuizObjSuccess(params))
        } catch (error) {
            dispatch(styleQuizObjClear())
        }
    }    
}

//=======================================================================================================
//StyleQuiz Action
export function styleQuizRequest () {
    return {
        type: TYPES.STYLE_QUIZ_REQUEST,
    }
}

export function styleQuizSuccess (data) {
    return {
        type: TYPES.STYLE_QUIZ_SUCCESS,
        data,
    }
}

export function styleQuizFailure (error) {
    return {
        type: TYPES.STYLE_QUIZ_FAILURE,
        error,
    }
}


export const styleQuiz = (params) => {
    console.log('[style-quiz-actions] styleQuiz params', params);
    return async dispatch => {
        dispatch(styleQuizRequest());
            try {
                Api.postAxios(endPoints.submitStyleQuiz ,params).then(response =>{
                    if (response.isSuccess && response.statusCode === 200) {
                        dispatch(styleQuizSuccess(response))
                        console.log('[style-quiz-actions] styleQuiz success case', response);
                    } else {
                        dispatch(styleQuizFailure(response))
                        console.log('[style-quiz-action] styleQuiz failure response ', response);
                    }   
                })
            } catch (error) {
                dispatch(styleQuizFailure(error))
            }
    }
}
