import React from "react";
import { Platform, Button } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Colors from "../constants/Colors";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import WishScreen from "../screens/WishScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import AddressScreen from "../screens/profile/AddressScreen";
import OrdersScreen from "../screens/profile/OrdersScreen";
import AddNewAddressScreen from "../screens/profile/AddNewAddressScreen";
import OrderDetailsScreen from "../screens/profile/OrderDetailsScreen";
import AddressDeliveryScreen from "../screens/order/AddressDeliveryScreen";
import SelectPayementScreen from "../screens/order/SelectPayementScreen";
import OrderConfirmScreen from "../screens/order/OrderConfirmScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Product: ProductScreen,
    Cart: CartScreen,
    AddressDelivery: AddressDeliveryScreen,
    SelectPayement: SelectPayementScreen,
    OrderConfirm: OrderConfirmScreen
  },
  {
    initialRouteName: "Home"
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

const WishStack = createStackNavigator({
  Wish: WishScreen
});

WishStack.navigationOptions = {
  tabBarLabel: "Favorites",
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
    />
  )
};

const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-navigate" : "md-navigate"}
    />
  )
};

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
    Address: AddressScreen,
    Orders: OrdersScreen,
    AddNewAddress: AddNewAddressScreen,
    OrderDetails: OrderDetailsScreen
  },
  {
    initialRouteName: "Profile"
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  WishStack,
  MapStack
});
