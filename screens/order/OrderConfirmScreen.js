import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "expo";

import Layout from "../../constants/Layout";
import { getTotal } from "../../reducers";
import { addNewOrder } from "../../actions";

class OrderConfirm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Order Confirm",
      headerBackTitle: null,
      headerTintColor: "#000"
    };
  };

  renderItems() {
    return (
      <View style={styles.itemWrap}>
        <Text style={styles.subTitle}>Your order:</Text>
        {this.props.order.items.map((item, index) => {
          return (
            <View key={index} style={styles.item}>
              <View style={styles.topBlock}>
                <Image style={styles.image} source={{ uri: item.url }} />
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View style={styles.middleBlock}>
                <Text style={styles.text}>Price: {item.price}</Text>
                <Text style={styles.text}>Quantity: {item.quantity}</Text>
                <Text style={styles.text}>
                  Summ: {item.price * item.quantity}
                </Text>
              </View>
            </View>
          );
        })}
        <Text style={styles.total}>Total: {this.props.total}$</Text>
      </View>
    );
  }

  onPress() {
    const { token } = this.props.auth;
    const { order, total } = this.props;
    const status = "Processing...";
    const date = new Date();
    let data = { ...order, total, date, status };
    this.props.addNewOrder({ token, data });
  }

  render() {
    const { address, payment } = this.props.order;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrap}>
          {this.renderItems()}
          <View style={styles.itemWrap}>
            <Text style={styles.subTitle}>Address information:</Text>
            <Text style={styles.text}>City: {address.city}</Text>
            <Text style={styles.text}>Street: {address.street}</Text>
            <Text style={styles.text}>Building: {address.building}</Text>
            <Text style={styles.text}>Apartment: {address.apartment}</Text>
          </View>
          <View style={styles.itemWrap}>
            <Text style={styles.subTitle}>Payment information:</Text>
            <Text style={styles.text}>{payment}</Text>
          </View>
        </ScrollView>
        <View style={styles.bottomBlock}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPress()}
          >
            <Text style={styles.buttonText}>Place your order</Text>
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10
  },
  wrap: {
    width: "100%"
  },
  itemWrap: {
    borderWidth: 0.5,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5
  },
  item: {
    // flex: 1,
  },
  topBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  middleBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  total: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right",
    marginTop: 15
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },
  text: {
    fontSize: 18,
    lineHeight: 24
  },
  bottomBlock: {
    marginTop: 5
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
    fontSize: 20,
    marginRight: 15
  }
});

function mapStateToProps(state) {
  return {
    auth: state.authReducer,
    order: state.orderReducer,
    total: getTotal(state)
  };
}

export default connect(
  mapStateToProps,
  { addNewOrder }
)(OrderConfirm);
