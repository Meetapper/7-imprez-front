import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import ShareCalendar from "../components/ShareCalendar";

const History = () => {
  const [date, setDate] = useState(new Date());

  return (
    <View style={style.container}>
      <Text style={{fontSize: 24}}>Your share history</Text>
      <View style={style.datepicker}>
        <IconButton 
          icon="chevron-left"
          size={40}
          onPress={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
        />
        <Text style={{fontSize: 20}}>{date.getMonth() + 1}/{date.getFullYear()}</Text>
        <IconButton 
          icon="chevron-right"
          size={40}
          onPress={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
        />
      </View>
      <ShareCalendar date={date}/>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  datepicker: {
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default History;