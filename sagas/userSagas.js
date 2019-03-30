import {
  USER_REQUEST_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
  REGISTER_USER,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_SUCCESS,
  ADD_NEW_ADDRESS,
  ADD_NEW_ADDRESS_SUCCESS,
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS,
  DELETE_ADDRESS_SUCCESS,
  ADD_NEW_ORDER,
  ADD_NEW_ORDER_SUCCESS
} from "../actions/types";

//Saga effects
import { put, takeLatest } from "redux-saga/effects";
import NavigationService from "../navigation/NavigationService";
import { Api } from "./Api";

// Get user data from api
function* getUserData(action) {
  try {
    const result = yield Api.getUserDataFromApi(action.token);
    if (result !== false) {
      yield put({ type: FETCH_USER_SUCCESS, user: result });
      NavigationService.navigate(action.lastScreen);
    } else {
      yield put({
        type: USER_REQUEST_ERROR,
        error: "Error1. Please try again"
      });
    }
  } catch (error) {
    yield put({ type: USER_REQUEST_ERROR, error: "Error2. Please try again" });
  }
}
export function* watchGetUserData() {
  yield takeLatest(FETCH_USER, getUserData);
}
// Registration
function* registerNewUser(action) {
  try {
    const result = yield Api.tryRegisterNewUserFromApi(action.userData);
    if (result !== false) {
      yield put({
        type: FETCH_USER,
        token: result.token,
        lastScreen: action.lastScreen
      });
    } else {
      yield put({ type: USER_REQUEST_ERROR, error: "Error1" });
    }
  } catch (error) {
    yield put({ type: USER_REQUEST_ERROR, error: "Error2" });
  }
}
export function* watchRegisterNewUser() {
  yield takeLatest(REGISTER_USER, registerNewUser);
}
// Authentication
function* loginUser(action) {
  try {
    const result = yield Api.tryLoginUserFromApi(action.userData);
    if (result !== false) {
      yield put({ type: LOGIN_USER_SUCCESS, user: result });
      NavigationService.navigate(action.lastScreen);
    } else {
      yield put({ type: USER_REQUEST_ERROR, error: "Error" });
    }
  } catch (error) {
    yield put({ type: USER_REQUEST_ERROR, error });
  }
}
export function* watchLogin() {
  yield takeLatest(LOGIN_USER, loginUser);
}
//Add new address
function* addNewAddress(action) {
  try {
    const result = yield Api.insertNewAddressFromApi(action.newAddress);
    if (result === true) {
      yield put({
        type: ADD_NEW_ADDRESS_SUCCESS,
        newAddress: action.newAddress
      });
      NavigationService.navigate(action.lastScreen);
    } else {
      yield put({ type: USER_REQUEST_ERROR, error: "Error" });
    }
  } catch (error) {
    yield put({ type: USER_REQUEST_ERROR, error });
    //do nothing
  }
}
export function* watchAddNewAddress() {
  yield takeLatest(ADD_NEW_ADDRESS, addNewAddress);
}

//Update a user data
function* updateUserData(action) {
  try {
    const result = yield Api.updateUserDataFromApi(action.updatedUserData);
    if (result === true) {
      yield put({
        type: UPDATE_USER_DATA_SUCCESS,
        updatedUserData: action.updatedUserData
      });
      NavigationService.navigate("Profile");
    }
  } catch (error) {
    yield put({ type: USER_REQUEST_ERROR, error });
    //do nothing
  }
}
export function* watchUpdateUserData() {
  yield takeLatest(UPDATE_USER_DATA, updateUserData);
}
//Update a address
function* updateAddress(action) {
  try {
    const result = yield Api.updateAddressFromApi(action.updatedAddress);
    if (result === true) {
      yield put({
        type: UPDATE_ADDRESS_SUCCESS,
        updatedAddress: action.updatedAddress
      });
      NavigationService.navigate(action.lastScreen);
    }
  } catch (error) {
    yield put({ type: USER_REQUEST_ERROR, error });
    //do nothing
  }
}
export function* watchUpdateAddress() {
  yield takeLatest(UPDATE_ADDRESS, updateAddress);
}

//Delete a address
function* deleteAddress(action) {
  try {
    const result = yield Api.deleteAddressFromApi(action.deletedAddress);
    if (result === true) {
      yield put({
        type: DELETE_ADDRESS_SUCCESS,
        deletedAddressId: action.deletedAddress.uId
      });
      NavigationService.navigate(action.lastScreen);
    }
  } catch (error) {
    yield put({ type: USER_REQUEST_ERROR, error });
    //do nothing
  }
}
export function* watchDeleteAddress() {
  yield takeLatest(DELETE_ADDRESS, deleteAddress);
}

//Add new order
function* addNewOrder(action) {
  try {
    const result = yield Api.insertNewOrderFromApi(action.newOrder);
    if (result === true) {
      yield put({ type: ADD_NEW_ORDER_SUCCESS, newOrder: action.newOrder });
      NavigationService.navigate("Home");
    } else {
      yield put({ type: USER_REQUEST_ERROR, error: "Error" });
    }
  } catch (error) {
    yield put({ type: USER_REQUEST_ERROR, error: "error2" });
    //do nothing
  }
}
export function* watchAddNewOrder() {
  yield takeLatest(ADD_NEW_ORDER, addNewOrder);
}
