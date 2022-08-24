
import { authConstant } from "../actions/constants"
const initState={
    firstName:'',
    lastName:'',
    email:'',
    authenticating:false,
    authenticated:false,
    error:null
}

const authReducer= (state=initState,action)=>{
    console.log(action)
switch(action.type){
    case `${authConstant.USER_LOGIN}_REQEST`:
        state={
            ...state,
            authenticating:true
        }
        break;
        case `${authConstant.USER_LOGIN}_SUCCESS`:
            state={
                ...state,
                ...action.payload.user,
                authenticated:true,
                authenticating:false
            }
            break;
            case `${authConstant.USER_LOGIN}_FAIL`:
                state={
                    ...state,
                    authenticated:false,
                    authenticating:false,
                    error:action.payload.error
                }
                break;
                case `${authConstant.USER_LOGOUT}_REQUEST`:

                    break
                    case `${authConstant.USER_LOGOUT}_SUCCESS`:
                        state={
                            ...initState
                        }
                        break;
                        case `${authConstant.USER_LOGOUT}_FAIL`:
                            state={
                                ...state,
                                error:action.payload.error
                            }
                            break;
                default: return state
                
}
return state
}

export default authReducer;