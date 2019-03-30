import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import { filterProducts } from "../actions";

class SearchBar extends Component {
  filterProducts(val) {
    this.props.filterProducts(val);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          underlineColorAndroid={"transparent"}
          placeholder="Start type what you want..."
          onChangeText={val => this.filterProducts(val)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
  input: {
    backgroundColor: "#fff",
    width: "95%",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16
  }
});

export default connect(
  null,
  { filterProducts }
)(SearchBar);
