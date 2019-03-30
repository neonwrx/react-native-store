import React from "react";
import {
  TouchableOpacity,
  Animated,
  View,
  Text,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "expo";

import HeaderCart from "../components/HeaderCart";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import Goods from "../components/Goods";
import CartMessage from "../components/CartMessage";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchBar: false
    };

    this.showSearchBar = this.showSearchBar.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "The Best Store",
      headerRight: <HeaderCart navigation={navigation} />,
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.state.params.handleSearch();
          }}
        >
          <Icon.Feather name="search" size={20} style={{ marginLeft: 9 }} />
        </TouchableOpacity>
      ),
      headerBackTitle: null
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleSearch: this.showSearchBar });
  }

  showSearchBar() {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar
    }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.showSearchBar ? <SearchBar /> : null}
        <ScrollView style={{ padding: 10, backgroundColor: "#fff" }}>
          <View style={{ height: 250, marginBottom: 10 }}>
            <Slider />
          </View>
          <Goods navigation={this.props.navigation} />
        </ScrollView>
        <CartMessage />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  null
)(HomeScreen);
