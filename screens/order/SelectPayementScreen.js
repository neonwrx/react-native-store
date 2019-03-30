import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Button
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "expo";

import { addOrderPayment } from "../../actions";

class SelectPayement extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Select Payement",
      headerBackTitle: null,
      headerTintColor: "#000"
    };
  };

  state = {
    disabledNext: true
  };

  onSelect(index, item) {
    const { address } = this.props.auth;
    for (let i = 0; i < address.length; i++) {
      this.setState({ [`blockPressed-${i}`]: false });
    }
    this.props.addOrderPayment(item);
    this.setState({ [`blockPressed-${index}`]: true, disabledNext: false });
  }

  render() {
    const { address } = this.props.auth;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.addressBlock}>
          <TouchableOpacity
            style={[
              styles.textWrap,
              this.state["blockPressed-0"] ? styles.mainTextWrap : null
            ]}
            onPress={() => this.onSelect(0, "Cash on delivery")}
          >
            <View style={styles.leftBlock}>
              <Icon.Ionicons
                name="ios-cash"
                size={36}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.text}>Cash on delivery</Text>
            </View>
            <Icon.MaterialIcons
              name={
                this.state["blockPressed-0"]
                  ? "radio-button-checked"
                  : "radio-button-unchecked"
              }
              size={26}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.textWrap,
              this.state["blockPressed-1"] ? styles.mainTextWrap : null
            ]}
            onPress={() => this.onSelect(1, "Visa")}
          >
            <View style={styles.leftBlock}>
              <Icon.FontAwesome
                name="cc-visa"
                size={25}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.text}>Visa</Text>
            </View>
            <Icon.MaterialIcons
              name={
                this.state["blockPressed-1"]
                  ? "radio-button-checked"
                  : "radio-button-unchecked"
              }
              size={26}
              color="#fff"
            />
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.bottomButtonWrap}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={[styles.buttonText, { color: "#000" }]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("OrderConfirm")}
            disabled={this.state.disabledNext}
          >
            <Text style={styles.buttonText}>Next Step</Text>
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
    width: 34,
    height: 26
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    color: "#fff"
  },
  bottomButtonWrap: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    padding: 15,
    backgroundColor: "#f4f4f4",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    padding: 15,
    backgroundColor: "#444444",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
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
  { addOrderPayment }
)(SelectPayement);
