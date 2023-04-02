import React, { useState } from "react";
import Profile from "./Profile";
import { StyleSheet, View } from "react-native";
import { styles } from "../constants";
import Logo from "../components/Logo";
import { Button, Text } from "react-native-paper";

const Home = ({navigation}) => {
  const [tab, setTab] = useState('profile');

  return (
    <View style={{ ...styles.centeredFlex, ...style.container }}>
      <View style={style.topBar}>
        <Logo />
        <View style={style.tabs}>
          <View style={style.innerTabs}>
            <View style={tab === 'shared' ? style.shapeShared : style.shape}></View>
            <Button onPress={() => setTab('profile')}><Text style={{color: '#fff', fontSize: 16}} >Profile</Text></Button>
            <Button onPress={() => setTab('shared')}><Text style={{color: '#fff', fontSize: 16}} >Shared</Text></Button>
          </View>
        </View>
      </View>
      {tab === 'profile' ? 
      <Profile navigation={navigation}/>:
      <></>}
    </View>
  );
}

const style = StyleSheet.create({
  topBar: {
    backgroundColor: 'black',
    width: '100%',
    paddingTop: 30,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 0,
    paddingBottom: 40,
  },
  tabs: {
    width: '100%',
    color: 'white',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  innerTabs: {
    flex: 0, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    width: '60%', 
    position: 'relative',
  },
  shape: {
    height: '80%',
    width: 80,
    borderRadius: 84,
    position: 'absolute',
    left: 25,
    backgroundColor: '#fff',
    opacity: 0.15
  },
  shapeShared: {
    height: '80%',
    width: 80,
    borderRadius: 84,
    position: 'absolute',
    right: 28,
    backgroundColor: '#fff',
    opacity: 0.15,
  }
});

export default Home;