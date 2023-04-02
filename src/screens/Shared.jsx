import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import SharedPost from "../components/SharePost";
import { usePostDataBearer } from "../utils/hooks";
import { useDispatch, useSelector } from "react-redux";

const Shared = ({ids}) => {
  const username = useSelector(state => state.user.username);
  const token = useSelector(state => state.user.accessToken);

  const {loading, error, data, postData, reset} =  usePostDataBearer('/interact/list', token)

  useEffect(() => {
    postData({users: ids})
  }, []);

  console.log(data)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {data?.map((post, index) => 
          <SharedPost key={index} username={post.username} ratio={post.likeRatio}/>
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