import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  ADD_TO_CART_ACTION,
  ADD_TO_CART_ACTION_HIDE,
  ADD_TO_CART
} from "../actions/types";

//Saga effects
import { put, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";
import { Api } from "./Api";

// Get products from api
function* getData() {
  try {
    const result = yield Api.getDataFromApi();
    yield put({ type: FETCHING_DATA_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: FETCHING_DATA_FAILURE });
  }
}
export function* watchGetData() {
  yield takeLatest(FETCHING_DATA, getData);
}

// Add to cart
function* addToCart(id) {
  try {
    yield put({ type: ADD_TO_CART, id: id.id });
    yield call(delay, 1000);
    yield put({ type: ADD_TO_CART_ACTION_HIDE });
  } catch (error) {
    // yield put({ });
  }
}
export function* watchAddToCart() {
  yield takeLatest(ADD_TO_CART_ACTION, addToCart);
}
