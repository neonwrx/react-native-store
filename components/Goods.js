import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon } from "expo";
import { connect } from "react-redux";

import { fetchData, addToCart } from "../actions";
import Layout from "../constants/Layout";

class Goods extends Component {
  state = {
    addedToCart: false
  };

  componentDidMount() {
    this.props.fetchData();
  }

  showOldPrice(item) {
    if (item.oldPrice !== "") {
      return <Text style={styles.oldPrice}>{item.oldPrice}$</Text>;
    }
  }
  onAddToCart(id) {
    this.props.addToCart(id);
  }
  render() {
    const { products, navigation, addToCart } = this.props;
    if (this.props.isFetching) {
      return (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {products.map((item, index) => {
          return (
            <View style={styles.item} key={index}>
              <TouchableOpacity
                style={styles.wrapper}
                onPress={() =>
                  navigation.navigate("Product", { item, addToCart })
                }
              >
                <Image source={{ uri: item.url }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.descr}</Text>
              </TouchableOpacity>
              <View style={styles.bottomBlock}>
                <View style={styles.priceBlock}>
                  {this.showOldPrice(item)}
                  <Text style={styles.price}>{item.price}$</Text>
                </View>
                {/* <TouchableOpacity onPress={() => addToCart(item.id)}> */}
                <TouchableOpacity onPress={() => this.onAddToCart(item.id)}>
                  <Icon.Feather name="shopping-cart" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    width: Layout.window.width / 2 - 14,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    alignSelf: "stretch"
  },
  bottomBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%"
  },
  priceBlock: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#c00",
    marginRight: 5
  },
  price: {
    fontSize: 16,
    alignSelf: "stretch"
  }
});

function mapStateToProps(state) {
  return {
    products: state.products.data.filter(product =>
      product.name.toLowerCase().includes(state.filterProducts.toLowerCase())
    ),
    isFetching: state.products.isFetching
  };
}

export default connect(
  mapStateToProps,
  { fetchData, addToCart }
)(Goods);
