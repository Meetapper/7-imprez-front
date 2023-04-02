import React, { useEffect, useState } from "react";
import { getImageUrl } from "../utils/bucketUtils";
import { StyleSheet } from "react-native";
import { usePostData } from "../utils/hooks";
import { useSelector } from "react-redux";
import { ActivityIndicator, Divider } from "react-native-paper";
import { View } from "react-native";
import { Image } from "react-native";

const SharedPost = ({username}) => {
  const [imageUri, setImageUri] = useState(null)
  const [stats, setStats] = useState(null);

  const token = useSelector(state => state.user.bearerToken);

  const {data, error, loading, postData, reset} = usePostData('/');

  useEffect(() => {
    getImageUrl(username).then(res => setImageUri(res));
  }, []);

  return (
    loading ? 
    <View style={{window: '100%', height: 300, flex: 0, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View> :
    <View style={style.post}>
      <Image 
        source={{uri: imageUri}}
        style={{width: 380, height: 380}}
      />
      <View style={style.buttons}>
        
      </View>
      <Divider />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    
  },
  post: {
    marginBottom: 60,
    borderWidth: 2,
    borderColor: "#e3e3e3"
  },
  buttons: {

  }
});

export default SharedPost;