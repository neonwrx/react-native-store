import {
  GET_ORDER_ADDRESS,
  GET_ORDER_PAYMENT,
  GET_ORDER_ITEMS,
  ADD_NEW_ORDER,
  ADD_NEW_ORDER_SUCCESS
} from "../actions/types";

export const addOrderItems = items => {
  return {
    type: GET_ORDER_ITEMS,
    items
  };
};

export const addOrderAddress = address => {
  return {
    type: GET_ORDER_ADDRESS,
    address
  };
};

export const addOrderPayment = payment => {
  return {
    type: GET_ORDER_PAYMENT,
    payment
  };
};

export const addNewOrder = newOrder => {
  return {
    type: ADD_NEW_ORDER,
    newOrder: newOrder
  };
};

const addNewOrderSuccess = (dispatch, newOrder) => {
  dispatch({
    type: ADD_NEW_ORDER_SUCCESS,
    payload: { newOrder }
  });
};
