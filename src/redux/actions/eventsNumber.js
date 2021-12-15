import {INCREMENT_EVENTS,INITIALISATION_EVENTS} from '../types'

export function incrementEvents (){
    return {
        type : INCREMENT_EVENTS,
    }
}
export function initEvents (){
    return {
        type :INITIALISATION_EVENTS,
    }
}
