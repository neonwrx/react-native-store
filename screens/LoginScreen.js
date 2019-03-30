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
import { loginAction } from "../actions";

class LoginScreen extends Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    email: "",
    password: ""
  };

  onLogin(lastScreen) {
    const { email, password } = this.state;
    this.props.loginAction(email, password, lastScreen);
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
          placeholder="Enter your password"
          autoCorrect={false}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => {
            this.setState({ password });
          }}
        />
        {this.renderError()}
        <TouchableOpacity
          onPress={() => this.onLogin(lastScreen)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.bottomTextWrap}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Registration", {
                lastScreen: lastScreen
              })
            }
          >
            <Text style={styles.registerLink}>Sign Up</Text>
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
    justifyContent: "center",
    backgroundColor: "#fff"
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
    marginVertical: 15
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  bottomTextWrap: {
    flexDirection: "row"
  },
  registerLink: {
    marginLeft: 5,
    color: "#05c5cf"
  },
  errorText: {
    color: "#c00",
    fontSize: 16
  }
});

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}

export default connect(
  mapStateToProps,
  { loginAction }
)(LoginScreen);
