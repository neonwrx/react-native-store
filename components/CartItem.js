import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Icon } from "expo";

class CartItem extends Component {
  render() {
    const { item, cart, quantityDown, quantityUp, removeFromCart } = this.props;
    return (
      <View style={styles.item}>
        <Image style={styles.image} source={{ uri: item.url }} />
        <View style={styles.textBlock}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionWrap}
            onPress={() => quantityDown(item.id)}
          >
            <Text style={styles.action}>-</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{cart.quantityById[item.id]}</Text>
          <TouchableOpacity
            style={styles.actionWrap}
            onPress={() => quantityUp(item.id)}
          >
            <Text style={styles.action}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeFromCart(item.id)}
        >
          <Icon.Ionicons name="md-trash" size={22} color="#c00" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomColor: "#a8a8a8",
    borderBottomWidth: 1
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  textBlock: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 50
  },
  name: {
    fontWeight: "bold"
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 70,
    height: 50
  },
  actionWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    backgroundColor: "#30b232",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fff"
  },
  action: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold"
  },
  deleteBtn: {
    marginLeft: 10
  }
});

export default CartItem;
