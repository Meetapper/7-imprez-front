import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const Logo = ({color = '#fff', logoStyle}) => {
  return (
    <Text style={{ ...style.text, color: color, ...logoStyle }}>
      share'em
    </Text>
  );
}

const style = StyleSheet.create({
  text: {
    fontFamily: 'Kanit',
    color: 'white',
    fontSize: 40
  }
});

export default Logo;