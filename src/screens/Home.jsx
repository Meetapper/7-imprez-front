import React from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/actions/userActions";
import { styles } from "../constants";

const Home = ({navigator}) => {
  return (
    <View style={styles.centeredFlex}>
      <Text>
        HOME
      </Text>
    </View>
  );
}

export default Home;