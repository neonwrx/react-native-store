import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USER_REQUEST_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
  FETCH_USER_SUCCESS,
  LOGOUT_USER,
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

const INITIAL_STATE = {
  email: "",
  name: "",
  phone: "",
  address: [],
  orders: [],
  token: "",
  error: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_REQUEST_ERROR:
      return { ...state, error: action.error, loading: false };
    case LOGIN_USER:
      return { ...state, error: "", loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.user.token,
        email: action.user.email,
        name: action.user.name,
        phone: action.user.phone,
        address: action.user.address,
        orders: action.user.orders,
        error: "",
        loading: false
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        token: action.user.token,
        email: action.user.email,
        name: action.user.name,
        phone: action.user.phone,
        address: action.user.address,
        error: "",
        loading: false
      };
    case LOGOUT_USER:
      return INITIAL_STATE;
    case UPDATE_USER_DATA:
      return { ...state, error: "", loading: true };
    case UPDATE_USER_DATA_SUCCESS:
      const { data } = action.updatedUserData;
      let newData = {};
      for (let prop in data) {
        newData[prop] = data[prop];
      }
      return {
        ...state,
        ...newData,
        error: "",
        loading: false
      };
    case ADD_NEW_ADDRESS:
      return { ...state, error: "", loading: true };
    case ADD_NEW_ADDRESS_SUCCESS:
      if (
        action.newAddress.data.primary === true &&
        state.address.length !== 0
      ) {
        for (var i = 0; i < state.address.length; i++) {
          state.address[i].primary = false;
        }
      }
      return {
        ...state,
        address: [...state.address, action.newAddress.data]
      };
    case UPDATE_ADDRESS:
      return { ...state, error: "", loading: true };
    case UPDATE_ADDRESS_SUCCESS:
      if (action.updatedAddress.data.primary === true) {
        for (var i = 0; i < state.address.length; i++) {
          state.address[i].primary = false;
        }
      }
      let upd = state.address.map(addr =>
        addr.uId.toString() === action.updatedAddress.uId
          ? {
              ...addr,
              ...action.updatedAddress.data
            }
          : addr
      );
      return {
        ...state,
        address: upd
      };
    case DELETE_ADDRESS_SUCCESS:
      const filteredAddress = state.address.filter(addr => {
        return addr.uId.toString() !== action.deletedAddressId.toString();
      });
      return {
        ...state,
        address: filteredAddress
      };
    case ADD_NEW_ORDER:
      return { ...state, error: "", loading: true };
    case ADD_NEW_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.newOrder.data]
      };
    default:
      return state;
  }
};
