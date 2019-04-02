import api from "../callbacks/api";
import { USER_REGISTERED, USER_LOGGED_IN, USER_LOGGED_OUT } from "../constants/constants";
import setAuthToken from "../../utils/setAuthToken";

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


// User Login

 export const userLoggedIn = data => ({
    type: USER_LOGGED_IN,
    payload: data
  })

export const login = loginData => dispatch => {
  return api.user.login(loginData).then(data => {
    localStorage.setItem("jwtToken", data.token);
    setAuthToken(data.token);
    dispatch(userLoggedIn(data))})
}

// User log Out

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
})

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(userLoggedOut())
}