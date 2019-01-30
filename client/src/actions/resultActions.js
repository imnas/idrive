import axios from "axios";
import { SEARCH_RESULTS, SEARCH_LOADING, GET_ERRORS } from "./types";

// Get instructors via zipcode
export const getInstructors = sendDataBack => dispatch => {
  dispatch(setInstructorLoading());
  axios
    .get(`http://localhost:9000/api/results/`)
    .then(res => {
      sendDataBack(res.data);
      dispatch({
        type: SEARCH_RESULTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Instructor loading
export const setInstructorLoading = () => {
  return {
    type: SEARCH_LOADING
  };
};
