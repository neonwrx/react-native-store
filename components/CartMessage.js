import React, { Component } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

import Layout from "../constants/Layout";

class CartMessage extends Component {
  state = {
    move: new Animated.Value(0)
  };

  componentDidUpdate() {
    if (this.props.cartAction === true) {
      this.show();
      setTimeout(() => {
        this.hide();
      }, 1000);
    }
  }
  show() {
    Animated.timing(this.state.move, {
      toValue: 50,
      duration: 500
    }).start();
  }

  hide() {
    Animated.timing(this.state.move, {
      toValue: 0,
      duration: 500
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.message,
          { transform: [{ translateY: this.state.move }] }
        ]}
      >
        <Text style={styles.text}>Item added to cart</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    position: "absolute",
    top: -50,
    left: 0,
    width: Layout.window.width,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  text: {
    color: "#fff",
    fontSize: 16
  }
});

function mapStateToProps(state) {
  return {
    cartAction: state.cart.cartAction.action
  };
}

export default connect(
  mapStateToProps,
  null
)(CartMessage);
