import { combineReducers } from "redux";
import cart, * as fromCart from "./cartReducer";
import products, * as fromProducts from "./productsReducer";
import filterProducts from "./filterProducts";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  products,
  cart,
  filterProducts,
  authReducer,
  orderReducer
});

const getAddedIds = state => fromCart.getAddedIds(state.cart);
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id);
const getProduct = (state, id) => fromProducts.getProduct(state.products, id);

export const getTotal = state =>
  getAddedIds(state)
    .reduce(
      (total, id) =>
        total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2);

export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }));
