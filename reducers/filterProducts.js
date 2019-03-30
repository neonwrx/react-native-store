import { FIND_PRODUCTS } from "../actions/types";

const INITIAL_STATE = "";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FIND_PRODUCTS:
      return action.product;
    default:
      return state;
  }
}

export const getProduct = (state, id) => state.data[id - 1];
