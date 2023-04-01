import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

const TextInputLabel = ({ 
  value,
  onChange,
  onFocus,
  onBlur,
  topLabel,
  mode,
  label,
  placeholder,
  style,
  password = false
}) => {
  return (
    <View style={{ ...inputStyle.container, ...style }}>
      <Text>{topLabel}</Text>
      <TextInput 
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        mode={mode}
        label={label}
        placeholder={placeholder}
        style={inputStyle.input}
        secureTextEntry={password}
      />
    </View>
  );
}

const inputStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%'
  },
  text: {},
  input: {
    width: '100%'
  },
});

export default TextInputLabel;