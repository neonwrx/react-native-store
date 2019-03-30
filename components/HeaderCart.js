import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Icon } from "expo";
import { connect } from "react-redux";

class HeaderCart extends Component {
  renderAddedCount() {
    if (this.props.addedIds > 0) {
      return (
        <View style={styles.count}>
          <Text style={styles.countText}>{this.props.addedIds}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.navigation.navigate("Cart")}
      >
        <Icon.Feather name="shopping-cart" size={20} />
        {this.renderAddedCount()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    padding: 7
  },
  count: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#e22e1b",
    padding: 2,
    borderRadius: 9,
    shadowColor: "black",
    shadowOpacity: 0.2,
    minWidth: 18,
    minHeight: 18,
    zIndex: 2
  },
  countText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 10
  }
});

function mapStateToProps(state) {
  return {
    addedIds: state.cart.addedIds.length
  };
}

export default connect(
  mapStateToProps,
  {}
)(HeaderCart);
