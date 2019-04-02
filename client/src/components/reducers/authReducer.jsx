import { USER_REGISTERED, ERROR_DETECTED } from "../constants/constants";



const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_REGISTERED:
        return {...state, user: action.payload}
        case ERROR_DETECTED:
        return {...state, errors: action.payload}
        default : return state
    }
}