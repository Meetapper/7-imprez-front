import React from "react";
import { styles } from "../constants"
import { Text, DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { View } from "react-native";

const LoginScreen = () => {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.centeredFlex}>
        <Text >
          LoginScreen  GOOGLELELEL
        </Text>
      </View>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default LoginScreen;