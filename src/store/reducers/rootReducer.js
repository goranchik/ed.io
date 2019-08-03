import {combineReducers} from 'redux'
import userReducer from "./user";
import courseReducer from "./course";

export default combineReducers({
    user: userReducer,
    course: courseReducer
})