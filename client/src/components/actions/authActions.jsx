import api from "../callbacks/api";
import { USER_REGISTERED } from "../constants/constants";

// User Registration

const userRegistered = newUser => {
    return {
        type: USER_REGISTERED,
        payload: newUser
    }
}


export const registerUser = (userData) => (dispatch) => {
  return  api.user.register(userData).then(newUser => dispatch(userRegistered(newUser)))
}