import * as TYPES from '../types';
import Api from '../../../services/api'
import { endPoints } from '../../../services'

//ScheduleQuiz Action
export function getAreaRequest () {
    return {
        type: TYPES.AREA_LIST_REQUEST,
    }
}

export function getAreaSuccess (data) {
    return {
        type: TYPES.AREA_LIST_SUCCESS,
        data,
    }
}

export function getAreaFailure (error) {
    return {
        type: TYPES.AREA_LIST_FAILURE,
        error,
    }
}


export const areaList = (params) => {
    console.log('[areaList params]', params);
    return async dispatch => {
        dispatch(getAreaRequest());
            try {
                Api.getAxios(endPoints.getArea ,params).then(response =>{
                    if (response.isSuccess && response.statusCode === 200) {
                        dispatch(getAreaSuccess(response))
                        console.log('[area-list-actions] areaList success case', response);
                    } else {
                        dispatch(getAreaFailure(response))
                        console.log('[area-list-action] areaList failure response ', response);
                    }   
                })
            } catch (error) {
                dispatch(getAreaFailure(error))
                console.log('[area-list-action] areaList failure catch ', response);
            }
    }
}
