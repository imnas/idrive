import { SEARCH_RESULTS, SEARCH_LOADING } from '../actions/types';

const initialState = {
    loading: false,
    instructors: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SEARCH_LOADING:
    return {
      ...state,
      loading: true
    }
    case SEARCH_RESULTS:
      return {
        ...state,
        instructors: action.payload,
        loading: false
    }
    default:
      return state;
  }
};