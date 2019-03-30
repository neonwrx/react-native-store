import {
  GET_ORDER_ADDRESS,
  GET_ORDER_PAYMENT,
  GET_ORDER_ITEMS
} from "../actions/types";

const INITIAL_STATE = {
  items: [],
  address: {},
  payment: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ORDER_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case GET_ORDER_ADDRESS:
      return {
        ...state,
        address: action.address
      };
    case GET_ORDER_PAYMENT:
      return {
        ...state,
        payment: action.payment
      };
    default:
      return state;
  }
}
