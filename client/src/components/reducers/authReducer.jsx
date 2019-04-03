import { USER_REGISTERED, USER_LOGGED_IN, USER_LOGGED_OUT } from "../constants/constants";



const initialState = {
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_REGISTERED:
        return {...state, user: action.payload}
       case USER_LOGGED_IN:
       return {...state, user: action.payload}
       case USER_LOGGED_OUT:
       return initialState
        default : return state
    }
}