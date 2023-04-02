import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./LoadingScreen";
import Home from "./Home";
import Login from "./LogIn";
import React from "react"
import SignUp from "./SignUp";
import History from "./History";

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
        name="Login"
        component={Login}
      />
      <Stack.Screen 
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen 
        name="Home"
        component={Home}
      />
      <Stack.Screen 
        name="History"
        component={History}
        options={{headerShown: true, title: 'Share History'}}
      />
    </Stack.Navigator>
  );
}

export default Screens;