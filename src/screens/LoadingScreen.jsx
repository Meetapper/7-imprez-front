import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles } from "../constants";

const LoadingScreen = () => {
  return (
    <View style={{ ...styles.centeredFlex, ...style.background}}>
      <Text style={style.text}>
        share'em
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    fontFamily: 'Kanit',
    color: 'white',
    fontSize: 40
  },
  background: {
    backgroundColor: 'black'
  }
})

export default LoadingScreen;