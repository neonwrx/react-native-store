import {
  ADD_TO_CART_ACTION,
  ADD_TO_CART_ACTION_HIDE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  QTY_UP,
  QTY_DOWN
} from "../actions/types";

export const addToCart = id => {
  return {
    type: ADD_TO_CART_ACTION,
    id
  };
};

function addToCartAction() {
  return {
    type: ADD_TO_CART_ACTION
  };
}

function addItemToCart(id) {
  return {
    type: ADD_TO_CART,
    id
  };
}

function addToCartActionHide() {
  return {
    type: ADD_TO_CART_ACTION_HIDE
  };
}

export const removeFromCart = id => {
  return {
    type: REMOVE_FROM_CART,
    id
  };
};

export const quantityUp = id => {
  return {
    type: QTY_UP,
    id
  };
};

export const quantityDown = id => {
  return {
    type: QTY_DOWN,
    id
  };
};
