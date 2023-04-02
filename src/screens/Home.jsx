import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { StyleSheet, View } from "react-native";
import { styles } from "../constants";
import Logo from "../components/Logo";
import { Button, Text } from "react-native-paper";
import BleManager from 'react-native-ble-manager';
import BLEAdvertiser from 'react-native-ble-advertiser'
import {NativeModules, NativeEventEmitter, Platform, PermissionsAndroid} from 'react-native'
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import Shared from "./Shared";


const Home = ({navigation}) => {

  const [tab, setTab] = useState('profile');

  const serviceUUID = 'be599d5f-23d7-46a4-b2f3-ff2715622a09';
  const scanInterval = 5000; // in millis
  const scanDuration = 1; // in seconds

  let userID = 128; // TODO

  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // turn on bluetooth if it is not on
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });
    // start bluetooth manager
    BleManager.start({showAlert: false}).then(() => {
      console.log('BLE Manager initialized');
      BleManager.checkState().then((result) => console.log(result));
    });

    BLEAdvertiser.enableAdapter();
    BLEAdvertiser.setCompanyId(userID); // Your Company's Code
    BLEAdvertiser.broadcast(serviceUUID, [userID], {}) // The service UUID and additional manufacturer data. 
    .then(success => console.log('Broadcasting Sucessful', success))
    .catch(error => console.log('Broadcasting Error', error));

    let stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        console.log("Scan stopped");
        setIsScanning(false);
        let ids = getNearbyUserIds();
        // TODO wysyłanie na backend
      },
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (!result) {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
        }
      });
    }

    setInterval(startScan, scanInterval);

    return () => {
      stopListener.remove();
    };
  }, []);
  
  const startScan = () => {
    console.log("Scanning...")
    if (!isScanning) {
      BleManager.scan([serviceUUID], scanDuration, true).then(() => {
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const getNearbyUserIds = () => {
    let ids = [];
    BleManager.getDiscoveredPeripherals().then(results => {
      if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
          ids.add(results[i].advertising.manufacturerData.bytes[5] + results[i].advertising.manufacturerData.bytes[6] * 32);
        }
      }
    });
    return ids;
  };

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
      <Shared />}
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