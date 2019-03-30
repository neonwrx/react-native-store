import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import Layout from "../constants/Layout";
import { registerAction } from "../actions";

class RegistrationScreen extends Component {
  static navigationOptions = {
    title: "Registration",
    headerBackTitle: null,
    headerTintColor: "#000"
  };

  state = {
    email: "",
    name: "",
    password: ""
  };

  onRegister() {
    const lastScreen = this.props.navigation.getParam("lastScreen", "");
    const { email, name, password } = this.state;

    this.props.registerAction(email, name, password, lastScreen);
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
    if (this.props.auth.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid={"transparent"}
          placeholder="Enter your phone"
          autoFocus={true}
          autoCorrect={false}
          value={this.state.email}
          onChangeText={email => {
            this.setState({ email });
          }}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid={"transparent"}
          placeholder="Enter your name"
          autoCorrect={false}
          value={this.state.name}
          onChangeText={name => {
            this.setState({ name });
          }}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid={"transparent"}
          placeholder="Enter your password"
          autoCorrect={false}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => {
            this.setState({ password });
          }}
        />
        <TouchableOpacity
          onPress={() => this.onRegister()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
    width: Layout.window.width * 0.9
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: Layout.window.width * 0.9,
    borderRadius: 50,
    padding: 15,
    backgroundColor: "#444444",
    marginTop: 15
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
  { registerAction }
)(RegistrationScreen);
