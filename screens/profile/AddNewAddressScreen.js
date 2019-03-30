import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import CheckBox from "react-native-check-box";

import { addNewAddress, changeAddress, deleteAddress } from "../../actions";

class AddNewAddressScreen extends Component {
  static navigationOptions = {
    title: "Add new address",
    headerBackTitle: null,
    headerTintColor: "#000",
    gesturesEnabled: false,
    headerLeft: null
  };

  state = {
    city: "",
    street: "",
    building: "",
    apartment: "",
    uId: "",
    primary: false,
    disabled: false,
    hasAddress: false
  };

  componentDidMount() {
    const address = this.props.navigation.getParam("currAddress", "");
    if (address) {
      this.setState({
        city: address.city,
        street: address.street,
        building: address.building,
        apartment: address.apartment,
        primary: address.primary,
        uId: address.uId,
        hasAddress: true
      });
    }
    if (this.props.auth.address.length === 0) {
      this.setState({ primary: true, disabled: true });
    }
  }

  addNewAddress(lastScreen) {
    const { token } = this.props.auth;
    const {
      city,
      street,
      building,
      apartment,
      primary,
      hasAddress,
      uId
    } = this.state;
    let data = {};

    if (city) {
      data = { ...data, city };
    }
    if (street) {
      data = { ...data, street };
    }
    if (building) {
      data = { ...data, building };
    }
    if (apartment) {
      data = { ...data, apartment };
    }
    if (Object.keys(data).length === 0) {
      alert("Not all fields are filled");
      return false;
    }
    data = { ...data, primary };
    if (hasAddress) {
      data = { ...data, uId };
      this.props.changeAddress({ token, data, uId }, lastScreen);
    } else {
      let newId = Math.random()
        .toString(36)
        .substr(2, 16);
      data = { ...data, uId: newId };
      this.props.addNewAddress({ token, data }, lastScreen);
    }
  }
  deleteAddress(lastScreen) {
    const { token } = this.props.auth;
    const { uId } = this.state;
    this.props.deleteAddress(token, uId, lastScreen);
  }

  renderError() {
    const { error } = this.props.auth;
    if (error) {
      return (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }
  }

  render() {
    const lastScreen = this.props.navigation.getParam("lastScreen", "");

    return (
      <View style={styles.container}>
        <View style={styles.textBlock}>
          {this.renderError()}
          <Text style={styles.text}>City</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={"transparent"}
            autoCorrect={false}
            placeholder="Enter your city"
            value={this.state.city}
            onChangeText={city => {
              this.setState({ city });
            }}
          />
          <Text style={styles.text}>Street</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={"transparent"}
            autoCorrect={false}
            placeholder="Enter your street"
            value={this.state.street}
            onChangeText={street => {
              this.setState({ street });
            }}
          />
          <Text style={styles.text}>Building</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={"transparent"}
            autoCorrect={false}
            placeholder="Enter your building number"
            keyboardType="numeric"
            value={this.state.building}
            onChangeText={building => {
              this.setState({ building });
            }}
          />
          <Text style={styles.text}>Apartment</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={"transparent"}
            autoCorrect={false}
            placeholder="Enter your apartment number"
            keyboardType="numeric"
            value={this.state.apartment}
            onChangeText={apartment => {
              this.setState({ apartment });
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <CheckBox
              style={styles.checkBoxStyle}
              onClick={() => {
                this.setState({
                  primary: !this.state.primary
                });
              }}
              isChecked={this.state.primary}
              disabled={this.state.disabled ? true : false}
              rightText={"Make primary"}
              rightTextStyle={{ fontSize: 16 }}
            />
          </View>
          {this.state.hasAddress ? (
            <TouchableOpacity
              style={styles.delButton}
              onPress={() => this.deleteAddress(lastScreen)}
            >
              <Text style={styles.delButtonText}>Delete this address</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addNewAddress(lastScreen)}
          >
            <Text style={styles.buttonText}>
              {this.state.hasAddress ? "Save" : "Add"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.props.navigation.navigate(lastScreen)}
          >
            <Text style={[styles.buttonText, { color: "#444" }]}>Cancel</Text>
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
  textBlock: {
    width: "100%"
  },
  text: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    fontSize: 16
  },
  checkBoxStyle: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15
  },
  buttonWrap: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    padding: 10,
    backgroundColor: "#444444"
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#ccc"
  },
  delButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: "#E4270C",
    borderRadius: 10
  },
  delButtonText: {
    color: "#000",
    fontSize: 18
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  errorText: {
    color: "#c00",
    fontSize: 16,
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}

export default connect(
  mapStateToProps,
  { addNewAddress, changeAddress, deleteAddress }
)(AddNewAddressScreen);
