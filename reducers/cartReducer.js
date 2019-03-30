import {
  ADD_TO_CART,
  ADD_TO_CART_ACTION,
  ADD_TO_CART_ACTION_HIDE,
  REMOVE_FROM_CART,
  QTY_UP,
  QTY_DOWN,
  CHECKOUT_REQUEST,
  ADD_NEW_ORDER_SUCCESS,
  CHECKOUT_FAILURE
} from "../actions/types";

const initialState = {
  addedIds: [],
  quantityById: {},
  cartAction: {
    action: false
  }
};

const cartAction = (state = initialState.cartAction, action) => {
  switch (action.type) {
    case ADD_TO_CART_ACTION:
      return {
        ...state,
        action: true
      };
    case ADD_TO_CART_ACTION_HIDE:
      return {
        ...state,
        action: false
      };
    default:
      return state;
  }
};

const addedIds = (state = initialState.addedIds, action) => {
  const { id } = action;
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(id) !== -1) {
        return state;
      }
      return [...state, id];
    case REMOVE_FROM_CART:
      return state.filter(i => i !== id);
    default:
      return state;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  const { id } = action;
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case REMOVE_FROM_CART:
      const newState = { ...state };
      delete newState[id];
      return newState;
    case QTY_UP:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case QTY_DOWN:
      if (state[action.id] !== 1) {
        return { ...state, [id]: (state[id] || 0) - 1 };
        return state;
      }
    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = state => state.addedIds;

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case ADD_NEW_ORDER_SUCCESS:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
        cartAction: cartAction(state.cartAction, action)
      };
  }
};

export default cart;
