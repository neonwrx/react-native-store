import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "expo";

class OrdersScreen extends Component {
  static navigationOptions = {
    title: "My orders",
    headerBackTitle: null,
    headerTintColor: "#000"
  };

  showDate(date) {
    const dd = new Date(date);
    const year = dd.getFullYear();
    let month = dd.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = dd.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return (
      <Text style={styles.text}>
        {day}-{month}-{year}
      </Text>
    );
  }

  render() {
    const { orders } = this.props.auth;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.addressBlock}>
          {orders.map((order, index) => {
            return (
              <TouchableOpacity
                style={styles.textWrap}
                key={index}
                onPress={() =>
                  this.props.navigation.navigate("OrderDetails", {
                    currOrder: order
                  })
                }
              >
                <View style={styles.leftSide}>
                  <Icon.Feather
                    name="check-circle"
                    size={40}
                    style={styles.icon}
                  />
                  <View>
                    <Text style={styles.mainText}>Order № {index + 1}4430</Text>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>
                <View style={styles.rightSide}>
                  <Text style={styles.text}>
                    View {order.items.length} items
                  </Text>
                  {this.showDate(order.date)}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
  addressBlock: {
    width: "100%"
  },
  textWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#b5b5b5",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10
  },
  leftSide: {
    flexDirection: "row"
  },
  rightSide: {
    alignItems: "flex-end"
  },
  icon: {
    marginRight: 14
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  statusText: {
    color: "#4CAF50"
  },
  text: {
    fontSize: 14,
    lineHeight: 20
  }
});

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}

export default connect(
  mapStateToProps,
  {}
)(OrdersScreen);
