import {INCREMENT_EVENTS,INITIALISATION_EVENTS} from '../types'

const initSatet = {
    nbEvents : 0,
}
const numberEventReducer = ( state = initSatet, action)=>{
    switch(action.type){
        case INCREMENT_EVENTS : return {
            ...state,
            nbEvents: state.nbEvents + 1
        }
        case INITIALISATION_EVENTS : return {
            ...state,
            nbEvents: 0
        }
        default: return state
    }
}

export default numberEventReducer;