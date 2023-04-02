import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const ShareCalendar = ({date}) => {
  const getDays = (year, month) => { return new Date(year, month, 0). getDate(); };
  
  return (
    <View style={style.container}>

      <View style={{width: '100%'}}>
        <View style={{width: '100%', flex: 0, flexDirection: 'row'}}>
          {[...Array(10)].map((_e, index) => 
            <View key={index} style={{backgroundColor: '#000', opacity: 0.1 * (index + 1), width: '10%', height: 30}}>
            </View>
          )}
        </View>
        <View style={{width: '100%', flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>0</Text>
          <Text>10</Text>
        </View>
      </View>

      <View style={style.days}>
        {[ ...Array(getDays(date.getFullYear(), date.getMonth() + 1))].map((_e, index) => 
          <View key={index} style={{width: 40, height: 40, backgroundColor: "#000", borderRadius: 6, borderWidth: 1, borderColor: "#000", opacity: (0.1 * (Math.floor(Math.random() * 10)))}}></View>
        )}
      </View>

    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop:20
  },
  days: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 10,
    marginLeft: 5,
    marginTop: 60
  }
});

export default ShareCalendar;