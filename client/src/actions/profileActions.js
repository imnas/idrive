import axios from 'axios';
import { GET_ERRORS, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('http://localhost:9000/api/profile/current')
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

// Get profile by user handle
export const getProfileByHandle = userHandle => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`http://localhost:9000/api/profile/${userHandle}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data}));
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};