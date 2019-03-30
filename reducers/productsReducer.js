import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE
} from "../actions/types";

const INITIAL_STATE = {
  data: [],
  isFetching: false,
  error: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        isFetching: true,
        data: []
      };
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      };
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
}

export const getProduct = (state, id) => state.data[id - 1];
