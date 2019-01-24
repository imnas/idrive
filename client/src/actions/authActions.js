import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:9000/api/auth/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User -> Get Token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:9000/api/auth/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwt", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      window.location.href = '/search';
    })
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Set Logged In User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log out current user
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwt");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
