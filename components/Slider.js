import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";
import Swiper from "react-native-swiper";

import Layout from "../constants/Layout";

const contentWidth = Layout.window.width - 20;
const images = [
  { url: require("../assets/images/banner-1.jpg"), text: "Free delivery" },
  { url: require("../assets/images/banner-2.jpg"), text: "Best offer" },
  { url: require("../assets/images/banner-3.jpg"), text: "Together cheaper" }
];

const Slide = props => (
  <View style={styles.container}>
    <Image source={props.uri} style={styles.image} />
    <Text style={styles.text}>{props.text}</Text>
  </View>
);

export default class Slider extends Component {
  render() {
    return (
      <Swiper
        showsButtons={false}
        autoplay
        autoplayTimeout={5}
        dotColor="rgba(204,204,204,.7)"
        activeDotColor="#000"
      >
        {images.map((item, i) => (
          <Slide uri={item.url} text={item.text} key={i} />
        ))}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  image: {
    flex: 1,
    width: contentWidth,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#000"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    top: 5,
    left: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2
  }
});
