import { USER_REGISTERED } from "../constants/constants";



const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_REGISTERED:
        return {...state, user: action.payload}
        default : return state
    }
}