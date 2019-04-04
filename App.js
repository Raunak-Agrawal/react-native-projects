import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./app/components/Login";
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
const AppNavigator = createStackNavigator({
  Login: { screen: Login }
});
const AppContainer = createAppContainer(AppNavigator);
