import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles } from "../constants";
import Logo from "../components/Logo";

const LoadingScreen = ({ navigation, route }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000);
  }, []);

  return (
    <View style={{ ...styles.centeredFlex, ...style.background}}>
      <Logo />
    </View>
  );
}

const style = StyleSheet.create({
  background: {
    backgroundColor: 'black'
  }
})

export default LoadingScreen;