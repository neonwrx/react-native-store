import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "expo";

import { logout } from "../actions";

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile",
    headerBackTitle: null
  };

  logout() {
    this.props.logout();
  }

  render() {
    const { token, name } = this.props.auth;
    return (
      <ScrollView>
        <View style={styles.imageWrap}>
          {!token ? (
            <TouchableOpacity
              style={styles.textWrap}
              onPress={() =>
                this.props.navigation.navigate("Login", {
                  lastScreen: "Profile"
                })
              }
            >
              <Text
                style={[
                  styles.userNameText,
                  { textDecorationLine: "underline" }
                ]}
              >
                Sign Up | Log In
              </Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={styles.userNameText}>Hi, {name}</Text>
            </View>
          )}
          {token ? (
            <TouchableOpacity
              style={styles.logoutWrap}
              onPress={() => {
                this.logout();
              }}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.textWrap}
          onPress={() => this.props.navigation.navigate("EditProfile")}
        >
          <View style={styles.leftBlock}>
            <Icon.Ionicons
              name="md-person"
              size={24}
              color="#424242"
              style={styles.icon}
            />
            <Text style={styles.text}>Edit profile</Text>
          </View>
          <Icon.Ionicons name="ios-arrow-forward" size={22} color="#424242" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textWrap}
          onPress={() => this.props.navigation.navigate("Address")}
        >
          <View style={styles.leftBlock}>
            <Icon.Ionicons
              name="ios-globe"
              size={24}
              color="#424242"
              style={styles.icon}
            />
            <Text style={styles.text}>My address</Text>
          </View>
          <Icon.Ionicons name="ios-arrow-forward" size={22} color="#424242" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textWrap}>
          <View style={styles.leftBlock}>
            <Icon.Ionicons
              name="ios-card"
              size={24}
              color="#424242"
              style={styles.icon}
            />
            <Text style={styles.text}>My card credit</Text>
          </View>
          <Icon.Ionicons name="ios-arrow-forward" size={22} color="#424242" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textWrap}
          onPress={() => this.props.navigation.navigate("Orders")}
        >
          <View style={styles.leftBlock}>
            <Icon.Ionicons
              name="ios-clipboard"
              size={24}
              color="#424242"
              style={styles.icon}
            />
            <Text style={styles.text}>My orders</Text>
          </View>
          <Icon.Ionicons name="ios-arrow-forward" size={22} color="#424242" />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageWrap: {
    width: "100%",
    height: 150,
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  userNameText: {
    color: "#fff",
    fontSize: 18
  },
  textWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  leftBlock: {
    alignItems: "center",
    flexDirection: "row"
  },
  icon: {
    width: 20
  },
  text: {
    fontSize: 16,
    marginLeft: 10
  },
  logoutWrap: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#000",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#fff"
  },
  logoutText: {
    fontSize: 16,
    color: "#fff"
  }
});

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(ProfileScreen);
