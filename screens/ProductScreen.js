import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import HeaderCart from "../components/HeaderCart";
import Layout from "../constants/Layout";
import CartMessage from "../components/CartMessage";

export default class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Store Name",
      headerRight: <HeaderCart navigation={navigation} />,
      headerBackTitle: null,
      headerTintColor: "#000"
    };
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", "NO-DATA");
    const addToCart = navigation.getParam("addToCart", "NO-DATA");

    return (
      <View style={styles.container}>
        <CartMessage />
        <Text style={styles.name}>{item.name}</Text>
        <Image style={styles.image} source={{ uri: item.url }} />
        <Text style={styles.descr}>{item.descr}</Text>
        <Text style={styles.price}>{item.price}$</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => addToCart(item.id)}
        >
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 10
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    zIndex: -1
  },
  image: {
    width: Layout.window.width - 40,
    height: Layout.window.width - 40,
    marginBottom: 10,
    zIndex: -1
  },
  descr: {
    alignSelf: "flex-start",
    marginBottom: 10
  },
  price: {
    fontSize: 18,
    marginBottom: 10
  },
  button: {
    alignItems: "center",
    width: Layout.window.width - 40,
    backgroundColor: "#444444",
    padding: 15,
    borderRadius: 5,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 1
  },
  buttonText: {
    color: "#fff",
    fontSize: 14
  }
});
