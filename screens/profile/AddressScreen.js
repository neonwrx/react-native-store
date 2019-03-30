import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "expo";

class AddressScreen extends Component {
  static navigationOptions = {
    title: "My address",
    headerBackTitle: null,
    headerTintColor: "#000"
  };

  render() {
    const { address } = this.props.auth;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.addressBlock}>
          {address.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.textWrap,
                  item.primary ? styles.mainTextWrap : null
                ]}
                key={index}
                onPress={() =>
                  this.props.navigation.navigate("AddNewAddress", {
                    currAddress: item,
                    lastScreen: "Address"
                  })
                }
              >
                <View style={styles.leftBlock}>
                  <Icon.Ionicons
                    name="ios-pin"
                    size={24}
                    color="#fff"
                    style={styles.icon}
                  />
                  <Text style={styles.text}>
                    {item.city}, {item.street} {item.building}, {item.apartment}
                  </Text>
                </View>
                <Icon.Ionicons
                  name="ios-arrow-forward"
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate("AddNewAddress", {
              lastScreen: "Address"
            })
          }
        >
          <Text style={styles.buttonText}>Add new address</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 26,
    borderWidth: 1,
    borderColor: "#b5b5b5",
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10
  },
  mainTextWrap: {
    borderColor: "#95c05f",
    backgroundColor: "#a1ce6a"
  },
  leftBlock: {
    alignItems: "center",
    flexDirection: "row"
  },
  icon: {
    width: 20
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    color: "#fff"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 15,
    backgroundColor: "#444444"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
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
)(AddressScreen);
