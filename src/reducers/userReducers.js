import { userConstants } from "../actions/constants"

const initState = {
    users: [],
    conversations: []
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
            break;
        case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
            state = {
                ...state,
                users: action.payload.users
            }
            break;
        case `${userConstants.GET_REALTIME_USERS}_FAIL`:
            state = {
                ...state,
                error: 'Request Failed'
            }
            break;
        case `${userConstants.GET_REALTIME_MESSAGES}_SUCCESS`:
            state = {
                ...state,
                conversations: action.payload.conversation
            }
            break
        case `${userConstants.GET_REALTIME_MESSAGES}_FAIL`:
            state = {
                ...state,
                conversations: action.payload.conversation
            }
            break

    }
    return state
}
export default userReducer