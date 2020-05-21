import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//ScheduleQuiz Action
export function scheduleQuizObjTrackScreen (screen) {
    return {
        type: TYPES.SCHEDULE_QUIZ_OBJ_TRACK,
        screen
    }
}

export function styleQuizObjSuccess (obj) {
    return {
        type: TYPES.SCHEDULE_QUIZ_OBJ_SUCCESS,
        obj,
    }
}

export function styleQuizObjClear () {
    return {
        type: TYPES.SCHEDULE_QUIZ_OBJ_CLEAR,
    }
}

export const ScheduleQuizObj = (params) => {
    console.log('[ScheduleQuiz.js] collect obj', params);
    return async dispatch => {
        dispatch(scheduleQuizObjTrackScreen())
        try {
            dispatch(styleQuizObjSuccess(params))
        } catch (error) {
            dispatch(styleQuizObjClear())
        }
    }    
}

//=======================================================================================================
//ScheduleQuiz Action
export function scheduleQuizRequest () {
    return {
        type: TYPES.SCHEDULE_QUIZ_REQUEST,
    }
}

export function scheduleQuizSuccess (data) {
    return {
        type: TYPES.SCHEDULE_QUIZ_SUCCESS,
        data,
    }
}

export function scheduleQuizFailure (error) {
    return {
        type: TYPES.SCHEDULE_QUIZ_FAILURE,
        error,
    }
}


export const scheduleQuiz = (params) => {
    console.log('[schedule-quiz-actions] scheduleQuiz params', params);
    return async dispatch => {
        dispatch(scheduleQuizRequest());
            try {
                Api.postAxios(endPoints.scheduleQuiz ,params).then(response =>{
                    if (response.isSuccess && response.statusCode === 200) {
                        dispatch(scheduleQuizSuccess(response))
                        console.log('[schedule-quiz-actions] scheduleQuiz success case', response);
                    } else {
                        dispatch(scheduleQuizFailure(response))
                        console.log('[schedule-quiz-action] scheduleQuiz failure response ', response);
                    }   
                })
            } catch (error) {
                dispatch(scheduleQuizFailure(error))
            }
    }
}
