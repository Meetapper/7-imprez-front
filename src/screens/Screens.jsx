import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./LoadingScreen";
import Home from "./Home";
import React from "react"

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="Loading"
        component={LoadingScreen}
      />
      <Stack.Screen 
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
}

export default Screens;