import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../constants";
import { getUserAvatarUri } from "../utils/interfaceUtils";
import SvgUri from "react-native-svg-uri";
import { Button, IconButton, SegmentedButtons } from "react-native-paper";
import Logo from "../components/Logo";

const Home = ({navigation}) => {
  const username = useSelector(state => state.user.username);
  const avatar = getUserAvatarUri(username);

  return (
    <View style={{ ...styles.centeredFlex, ...style.container }}>
      <View style={style.topBar}>
        <Logo />
        <View style={style.tabs}>
          <View style={style.innerTabs}>
            <View style={style.shape}></View>
            <Button><Text style={{color: '#fff'}}>Profile</Text></Button>
            <Button><Text style={{color: '#fff'}}>Shared</Text></Button>
          </View>
        </View>
      </View>
      <View style={style.avatarContainer}>
        <Image 
          source={{uri: avatar}}
          style={style.avatar}
        />
        <Text style={style.username}>{username}</Text>
      </View>
      <View style={style.buttons}>
        <View style={style.buttonContainer}>
          <IconButton
            icon="calendar"
            size={40}
          />
          <Text>History</Text>
        </View>
        <View style={style.buttonContainer}>
          <IconButton
            icon="account-group"
            size={40}
          />
          <Text>Friends</Text>
        </View>
        <View style={style.buttonContainer}>
          <IconButton
            icon="chart-timeline-variant-shimmer"
            size={40}
          />
          <Text>Statistics</Text>
        </View>
        <View style={style.buttonContainer}>
          <IconButton
            icon="cog"
            size={40}
          />
          <Text>Settings</Text>
        </View>
      </View>
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
  avatarContainer: {
    flex: 0,
    alignItems: 'center',
    marginTop: 30
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 9999
  },
  username: {
    fontSize: 24,
    marginTop: 20
  },
  buttons: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 20
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    justifyContent: 'space-between', 
    width: '50%', 
    position: 'relative'
  },
  shape: {
    height: '100%',
    width: 100,
    borderRadius: 24,
    position: 'absolute',
    backgroundColor: ''
  }
});

export default Home;