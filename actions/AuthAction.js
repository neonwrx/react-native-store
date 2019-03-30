import axios from "axios";
import { AsyncStorage } from "react-native";
import NavigationService from "../navigation/NavigationService";
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER
} from "./types";

export const loginAction = (email, password, lastScreen) => {
  return {
    type: LOGIN_USER,
    userData: { email, password },
    lastScreen: lastScreen
  };
};

export const registerAction = (email, name, password, lastScreen) => {
  return {
    type: REGISTER_USER,
    userData: { email, name, password },
    lastScreen: lastScreen
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER
  };
};
