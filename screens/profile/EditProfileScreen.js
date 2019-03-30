import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import { changeData } from "../../actions";

class EditProfileScreen extends Component {
  static navigationOptions = {
    title: "Edit my profile",
    headerBackTitle: null,
    headerTintColor: "#000"
  };

  state = {
    name: "",
    phone: "",
    email: ""
  };

  changePersonalData() {
    const { token } = this.props.auth;
    const { name, phone, email } = this.state;
    let data = {};
    if (name && name !== this.props.auth.name) {
      data = { ...data, name };
    }
    if (phone && phone !== this.props.auth.phone) {
      data = { ...data, phone };
    }
    if (email && email !== this.props.auth.email) {
      data = { ...data, email };
    }
    if (Object.keys(data).length === 0) {
      this.props.navigation.navigate("Profile");
    } else {
      this.props.changeData(token, data);
      this.setState({
        name: "",
        phone: "",
        email: ""
      });
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.text}>Your name</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={"transparent"}
            placeholder="Enter your name"
            value={auth.name}
            onChangeText={name => {
              this.setState({ name });
            }}
          />
          <Text style={styles.text}>Mobile phone</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={"transparent"}
            placeholder="Enter your mobile phone"
            value={auth.phone}
            onChangeText={phone => {
              this.setState({ phone });
            }}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid={"transparent"}
            placeholder="Enter your email"
            value={auth.email}
            onChangeText={email => {
              this.setState({ email });
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.changePersonalData()}
        >
          <Text style={styles.buttonText}>Save</Text>
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
  { changeData }
)(EditProfileScreen);
