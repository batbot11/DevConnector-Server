import api from "../callbacks/api";
import { USER_REGISTERED } from "../constants/constants";



const userRegistered = data => {
    return {
        type: USER_REGISTERED,
        payload: data
    }
}

export const registerUser = (userData) => (dispatch) => {
  return  api.user.register(userData).then(data => dispatch(userRegistered(data)))
}