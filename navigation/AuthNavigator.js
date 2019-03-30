import React from "react";
import { createStackNavigator } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Registration: RegistrationScreen
  },
  {
    initialRouteName: "Login"
  }
);

export default AuthStack;
