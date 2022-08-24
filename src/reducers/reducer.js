
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducers";


const rootReducer=combineReducers({
    auth:authReducer,
    user:userReducer
})



export default rootReducer;