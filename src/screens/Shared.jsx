import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import SharedPost from "../components/SharePost";

const Shared = () => {
  const users = ['user1', 'user2', 'user3'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {users.map((user, index) => 
          <SharedPost key={index} username={user}/>
        )}
      </ScrollView> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
  },
});

export default Shared;