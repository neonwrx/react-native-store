//Saga effects
import { fork, all } from "redux-saga/effects";

import {
  watchRegisterNewUser,
  watchGetUserData,
  watchLogin,
  watchUpdateUserData,
  watchAddNewAddress,
  watchUpdateAddress,
  watchDeleteAddress,
  watchAddNewOrder
} from "./userSagas";

import { watchGetData, watchAddToCart } from "./dataSagas";

export default function* rootSaga() {
  yield all([
    fork(watchGetData),
    fork(watchAddToCart),
    fork(watchRegisterNewUser),
    fork(watchGetUserData),
    fork(watchLogin),
    fork(watchUpdateUserData),
    fork(watchAddNewAddress),
    fork(watchUpdateAddress),
    fork(watchDeleteAddress),
    fork(watchAddNewOrder)
  ]);
}
