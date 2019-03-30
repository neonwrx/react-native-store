import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "expo";

import Layout from "../constants/Layout";
import CartItem from "../components/CartItem";
import {
  quantityUp,
  quantityDown,
  removeFromCart,
  addOrderItems
} from "../actions";
import { getTotal } from "../reducers";

class Cart extends Component {
  static navigationOptions = {
    title: "Cart",
    headerTintColor: "#000"
  };

  state = {
    total: 0
  };

  renderFlatList() {
    if (this.props.cartProducts.length === 0) {
      return (
        <View>
          <Text>Your shopping cart is empty</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.cartProducts}
        renderItem={({ item, index }) => (
          <CartItem
            item={item}
            cart={this.props.cart}
            quantityUp={this.props.quantityUp}
            quantityDown={this.props.quantityDown}
            removeFromCart={this.props.removeFromCart}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  onPress() {
    if (!this.props.cart.addedIds.length) {
      Alert.alert("Please add some products to cart and continue");
    } else if (!this.props.auth.token) {
      this.props.navigation.navigate("Login", { lastScreen: "Home" });
    } else {
      const prod = this.props.cartProducts;
      for (let i = 0; i < prod.length; i++) {
        prod[i].quantity = this.props.cart.quantityById[prod[i].id];
      }
      this.props.addOrderItems(prod);
      this.props.navigation.navigate("AddressDelivery");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.itemWrap}>{this.renderFlatList()}</ScrollView>
        <View style={styles.bottomBlock}>
          <Text style={styles.total}>Total: {this.props.total}$</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPress()}
          >
            <Text style={styles.buttonText}>Next step</Text>
            <Icon.Ionicons
              name="ios-arrow-forward"
              size={22}
              color="#fff"
              style={{ marginTop: 3 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff"
  },
  itemWrap: {
    width: "100%"
  },
  bottomBlock: {
    marginTop: 5
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 18,
    marginRight: 15
  }
});

function mapStateToProps(state) {
  const { addedIds } = state.cart;
  const { data } = state.products;
  return {
    auth: state.authReducer,
    cart: state.cart,
    total: getTotal(state),
    cartProducts: data.filter(item => {
      for (let i = 0; i < addedIds.length; i++) {
        if (item.id === addedIds[i]) {
          return true;
        }
      }
      return false;
    })
  };
}

export default connect(
  mapStateToProps,
  { quantityUp, quantityDown, removeFromCart, addOrderItems }
)(Cart);
