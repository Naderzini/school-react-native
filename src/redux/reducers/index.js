import { combineReducers } from "redux";
import numberEventReducer from './eventsNumber'



export default combineReducers({
   nbEvents:numberEventReducer
    
   }); 
