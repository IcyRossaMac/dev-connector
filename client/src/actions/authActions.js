import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import qs from "qs";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", qs.stringify(userData))
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;

      // Set token to local storage
      localStorage.setItem("jwtToken", token);

      // Set token to auth header
      setAuthToken(token);

      // Decode Token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log User Out
export const logoutUser = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem("jwtToken");

  // Remove Auth Header for future requests
  setAuthToken(false);

  // Set the current user to an empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  // Send User to login page
  window.location.href = '/login'
};
