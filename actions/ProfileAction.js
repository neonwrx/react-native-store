import {
  CHANGING_PROFILE_DATA_SUCCESS,
  CHANGING_PROFILE_DATA_FAILURE,
  ADD_NEW_ADDRESS,
  ADD_NEW_ADDRESS_SUCCESS,
  ADD_NEW_ADDRESS_FAIL,
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_SUCCESS,
  ADDRESS_ERROR,
  DELETE_ADDRESS,
  UPDATE_USER_DATA,
} from '../actions/types';

export const changeData = ( token, data ) => {
  return {
    type: UPDATE_USER_DATA,
    updatedUserData: { token, data }
  }
}

export const addNewAddress = ( address, lastScreen ) => {
  return {
    type: ADD_NEW_ADDRESS,
    newAddress: address,
    lastScreen: lastScreen
  }
}

export const changeAddress = ( address, lastScreen ) => {
  return {
    type: UPDATE_ADDRESS,
    updatedAddress: address,
    lastScreen: lastScreen
  }
}

export const deleteAddress = ( token, uId, lastScreen ) => {
  return {
    type: DELETE_ADDRESS,
    deletedAddress: { token, uId },
    lastScreen: lastScreen
  }
}

const changeDataFailure = (dispatch, message) => {
  dispatch({
    type: CHANGING_PROFILE_DATA_FAILURE,
    payload: message
  });
};

const changeDataSuccess = (dispatch, email, name, phone) => {
  dispatch({
    type: CHANGING_PROFILE_DATA_SUCCESS,
    payload: { email, name, phone }
  });
};

const addAddressSuccess = (dispatch, address) => {
  dispatch({
    type: ADD_NEW_ADDRESS_SUCCESS,
    payload: { address }
  });
};

const changeAddressSuccess = (dispatch, address) => {
  dispatch({
    type: CHANGE_ADDRESS_SUCCESS,
    payload: { address }
  });
};

const addressError = (dispatch, message) => {
  dispatch({
    type: ADDRESS_ERROR,
    payload: message
  });
};
