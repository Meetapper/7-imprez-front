import React from "react";
import { styles } from "../constants"
import { Text, DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.centeredFlex}>
        <Text theme={theme}>
          LoginScreen  GOOGLELELELsadasda
        </Text>
      </View>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'yellow',
  },
};

export default LoginScreen;