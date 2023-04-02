import React, { useEffect, useState } from "react";
import { getImageUrl } from "../utils/bucketUtils";
import { StyleSheet } from "react-native";
import { usePostData } from "../utils/hooks";
import { useSelector } from "react-redux";
import { ActivityIndicator, Divider, IconButton, Text } from "react-native-paper";
import { View } from "react-native";
import { Image } from "react-native";
import axios from "axios";
import { baseUrl } from '../constants';

const SharedPost = ({username, ratio}) => {
  const [imageUri, setImageUri] = useState(null)
  const [stats, setStats] = useState(null);

  const token = useSelector(state => state.user.accessToken);

  useEffect(() => {
    getImageUrl(username).then(res => setImageUri(res));
    axios.post(baseUrl + `/interact/${username}/seen`, {}, {headers: {'Authorization': 'Bearer ' + token}});
  }, []);

  return (
    <View style={style.post}>
      <Image 
        source={{uri: imageUri}}
        style={{width: 380, height: 380}}
      />
      <View style={style.actions}>
        <View style={{flex: 0, flexDirection: 'row'}}>
          <Text>Like Ratio: {ratio}</Text>
        </View>
        <View>
          <IconButton 
            icon="cards-heart-outline"
            size={30}
            iconColor="#de2f5a"
            // TODO: like on click
            onPress={() => axios.post(baseUrl + `/interact/${username}/liked`, {})}
          />
        </View>
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
  actions: {
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});

export default SharedPost;