import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard
} from "react-native";
import { Icon } from "native-base";
import * as Animatable from "react-native-animatable";
// import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
export default class Login extends Component {
  static navigationOptions = {
    header: null
  };
  KeyboardDidShowListener = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: 500,
        toValue: 10
      }),
      Animated.timing(this.forwardArrowOpacity, {
        // duration: 500,
        toValue: 1
      })
    ]).start();
  };
  KeyboardDidHideListener = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: 500,
        toValue: 0
      }),
      Animated.timing(this.forwardArrowOpacity, {
        // duration: 500,
        toValue: 0
      })
    ]).start();
  };
  increaseLoginHeight = () => {
    Animated.timing(this.loginHeight, {
      toValue: height,
      duration: 500
    }).start(() => this.refs.inputRef.focus());
  };
  decreaseHeightLogin = () => {
    Keyboard.dismiss();
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 500
    }).start();
  };
  componentWillMount() {
    this.loginHeight = new Animated.Value(150);
    this.keyboardHeight = new Animated.Value(0);
    this.forwardArrowOpacity = new Animated.Value(0);
    this.KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.KeyboardDidShowListener
    );
    this.KeyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.KeyboardDidHideListener
    );
  }
  render() {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, height],
      outputRange: [1, 0]
    });
    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, height],
      outputRange: [25, 30]
    });
    const backArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, height],
      outputRange: [0, 1]
    });
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            top: 40,
            left: 25,
            zIndex: 1,
            opacity: backArrowOpacity
          }}
        >
          <TouchableOpacity onPress={this.decreaseHeightLogin}>
            <Icon name="md-arrow-back" style={{ color: "black" }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            height: 60,
            width: 60,
            bottom: this.keyboardHeight,
            right: 10,
            backgroundColor: "#54575e",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            opacity: this.forwardArrowOpacity
          }}
        >
          <Icon name="md-arrow-forward" style={{ color: "white" }} />
        </Animated.View>
        <ImageBackground
          source={require("../assets/background.jpg")}
          style={{ flex: 1 }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Animatable.View
              animation="zoomIn"
              iterationCount={1}
              style={{
                height: 100,
                width: 100,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: 25 }}>UBER</Text>
            </Animatable.View>
          </View>
          <Animatable.View animation="slideInUp" iterationCount={1}>
            <Animated.View
              style={{ height: this.loginHeight, backgroundColor: "#fff" }}
            >
              <Animated.View
                style={{
                  opacity: headerTextOpacity,
                  alignItems: "flex-start",
                  marginTop: 25,
                  paddingHorizontal: 20
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  Get Moving With Uber
                </Text>
              </Animated.View>
              <TouchableOpacity onPress={this.increaseLoginHeight}>
                <Animated.View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: marginTop,
                    paddingHorizontal: 20
                  }}
                >
                  <Image
                    source={require("../assets/flag.png")}
                    style={{ height: 34, width: 34, resizeMode: "contain" }}
                  />
                  <View
                    style={{ flex: 1, flexDirection: "row" }}
                    pointerEvents="none"
                  >
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 20,
                        alignSelf: "center"
                      }}
                    >
                      +91
                    </Text>

                    <TextInput
                      ref="inputRef"
                      placeholder="Tap to Enter mobile number"
                      style={{ flex: 1, fontSize: 20 }}
                      underlineColorAndroid="transparent"
                      keyboardType="number-pad"
                    />
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <View
              style={{
                height: 70,
                backgroundColor: "#fff",
                borderTopColor: "gray",
                borderTopWidth: 1,
                justifyContent: "center"
              }}
            >
              <Text style={{ paddingHorizontal: 20, color: "blue" }}>
                Or connect through social network
              </Text>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
