import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { Icon } from "expo";

class OrderDetails extends Component {
  static navigationOptions = {
    title: "Order Details",
    headerBackTitle: null,
    headerTintColor: "#000"
  };

  showDate(date) {
    const dd = new Date(date);
    const year = dd.getFullYear();
    const month = dd.getMonth() + 1;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const day = dd.getDate();
    const hours = dd.getHours();
    const minutes = dd.getMinutes();
    return (
      <Text style={styles.orderTitle}>
        {monthNames[month]} {day}, {year} {hours}:{minutes}
      </Text>
    );
  }

  render() {
    const order = this.props.navigation.getParam("currOrder", "");

    return (
      <View style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.topBlock}>
            <View>
              <Text>Order status:</Text>
              <Text style={styles.status}>Processing...</Text>
            </View>
            <View style={styles.iconsWrap}>
              <View style={styles.iconWrap}>
                <Icon.MaterialCommunityIcons
                  name="clock-outline"
                  size={26}
                  color="#737373"
                  style={styles.icon}
                />
              </View>
              <View style={styles.iconLine} />
              <View style={styles.iconWrap}>
                <Icon.MaterialCommunityIcons
                  name="truck-delivery"
                  size={26}
                  color="#737373"
                  style={styles.icon}
                />
              </View>
              <View style={styles.iconLine} />
              <View style={styles.iconWrap}>
                <Icon.MaterialCommunityIcons
                  name="home"
                  size={26}
                  color="#737373"
                  style={styles.icon}
                />
              </View>
            </View>
          </View>
          <View style={styles.middleBlock}>
            <Text style={styles.orderTitle}>Order Detail</Text>
            <Text style={styles.orderTitle}>{this.showDate(order.date)}</Text>
          </View>
          {order.items.map((item, index) => {
            return (
              <View style={styles.itemWrap} key={index}>
                <Image style={styles.image} source={{ uri: item.url }} />
                <View style={styles.itemTextBlock}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemBottomWrap}>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text style={styles.price}>{item.price}$</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.bottomBlock}>
          <View>
            <Text>Paid method:</Text>
            <Text style={styles.payment}>{order.payment}</Text>
          </View>
          <View>
            <Text style={styles.total}>Total:</Text>
            <Text style={styles.total2}>{order.total}$</Text>
          </View>
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
    backgroundColor: "#EEEEEE"
  },
  topBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 15
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#169591"
  },
  iconsWrap: {
    alignItems: "center",
    flexDirection: "row"
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 20,
    width: 40,
    height: 40,
    padding: 5
  },
  iconLine: {
    width: 30,
    height: 1,
    backgroundColor: "#999"
  },
  middleBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: "#000"
  },
  orderTitle: {
    color: "#fff",
    fontSize: 16
  },
  itemWrap: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#999"
  },
  image: {
    width: 80,
    height: 80,
    borderColor: "#737373",
    borderWidth: 0.5,
    borderRadius: 10,
    marginRight: 10
  },
  itemTextBlock: {
    flex: 1,
    justifyContent: "space-between"
  },
  itemName: {
    fontSize: 16
  },
  itemBottomWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5
  },
  price: {
    fontSize: 16,
    fontWeight: "bold"
  },
  bottomBlock: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 10
  },
  payment: {
    fontWeight: "bold",
    marginTop: 3
  },
  total: {
    textAlign: "right"
  },
  total2: {
    fontSize: 22,
    color: "#41c300",
    fontWeight: "bold"
  }
});

export default OrderDetails;
