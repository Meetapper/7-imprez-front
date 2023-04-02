import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserAvatarUri } from "../utils/interfaceUtils";
import { Button, IconButton } from "react-native-paper";
import { checkImage, getImageUrl, uploadImage } from "../utils/bucketUtils";
import { setDailyPosted } from "../redux/actions/sharedActions";
import { useGetDataBearer } from "../utils/hooks";

const Profile = ({navigation}) => {
  const username = useSelector(state => state.user.username);
  const token = useSelector(state => state.user.accessToken);
  const avatar = getUserAvatarUri(username);
  const dispatch = useDispatch();
  const [dailyOpen, setDailyOpen] = useState(false);

  const dailyPosted = useSelector(state => state.shared.dailyPosted);
  const [dailyUri, setDailyUri] = useState(null);

  useEffect(() => {
    checkImage(username).then(res => {
      dispatch(setDailyPosted(res));
    })
  }, []);

  const {loading, error, data, postData, reset} =  useGetDataBearer('/interact/stats', token)

  useEffect(() => {
    if (!!dailyPosted && !dailyUri) {
      setTimeout(() => {
        getImageUrl(username).then(res => {
          setDailyUri(res);
        });
      }, 500);
    }
  }, [dailyPosted]);


  return (
    <>
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
            onPress={() => navigation.navigate('History')}
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
            icon="podium"
            size={40}
          />
          <Text>Leaderboards</Text>
        </View>
        <View style={style.buttonContainer}>
          <IconButton
            icon="cog"
            size={40}
          />
          <Text>Settings</Text>
        </View>
      </View>
      {dailyPosted ?
      <>
        <Text style={{fontSize: 34, marginTop: 20}}>Your Daily Share</Text>
        <View style={style.stats}>
          <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', rowGap:20}}>
            <View style={{...style.statCircle, borderColor: "#A6a6a6"}}>
              <Text style={{fontSize: 24}}>{data?.LIKED + data?.SEEN}</Text>
            </View>
            <Text>Views</Text>
          </View>

          <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', rowGap: 10, marginTop: 20}}>
            <View style={{...style.statCircle, borderColor: "#D89eac"}}>
              <Text style={{fontSize: 20}}>{parseInt(data?.LIKED / (data?.LIKED + data?.SEEN) * 100)}%</Text>
            </View>
            <Text>Like Ratio</Text>
          </View>

          <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', rowGap: 20}}>
            <View style={{...style.statCircle, borderColor: "#De2f5a"}}>
              <Text style={{fontSize: 24, color: "#21130d"}}>{data?.LIKED}</Text>
            </View>
            <Text style={{color: "#21130d"}}>Likes</Text>
          </View>
        </View>
        <View style={dailyOpen ? { ...style.bottomSheet, top: 0 } : style.bottomSheet}>
          <IconButton 
            icon="chevron-up"
            size={40}
            onPress={() => setDailyOpen(!dailyOpen)}
            style={dailyOpen ? { transform: [{rotate: '180deg'}], marginTop: 40 } : { transform: [{rotate: '0deg'}] }}
          />
          <Image 
            source={{uri: dailyUri}}
            style={{width: 500, height: 500}}
            resizeMode="contain"
            alt="dupa123"
          />
                  <View style={{...style.stats, paddingHorizontal: 63}}>
          <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', rowGap:20}}>
            <View style={{...style.statCircle, borderColor: "#A6a6a6"}}>
              <Text style={{fontSize: 24}}>{data?.LIKED + data?.SEEN}</Text>
            </View>
            <Text>Views</Text>
          </View>

          <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', rowGap: 10, marginTop: 20}}>
            <View style={{...style.statCircle, borderColor: "#D89eac"}}>
              <Text style={{fontSize: 20}}>{parseInt(data?.LIKED / (data?.LIKED + data?.SEEN) * 100)}%</Text>
            </View>
            <Text>Like Ratio</Text>
          </View>

          <View style={{flex: 0, justifyContent: 'center', alignItems: 'center', rowGap: 20}}>
            <View style={{...style.statCircle, borderColor: "#De2f5a"}}>
              <Text style={{fontSize: 24, color: "#21130d"}}>{data?.LIKED}</Text>
            </View>
            <Text style={{color: "#21130d"}}>Likes</Text>
          </View>
        </View>
          <Button onPress={() => setDailyOpen(false)} mode="contained" style={{width: '95%', marginTop: 40}}>
            Close
          </Button>
        </View>
      </> :
      <>
        <Text style={{fontSize: 34, marginTop: 120}}>Post Your Daily Share</Text>
        <Button mode='contained' onPress={() => uploadImage(username).then(_res => {dispatch(setDailyPosted(true))})} style={{marginTop: 20, paddingHorizontal: 20, paddingVertical: 10}}>
          <Text style={{fontSize: 20}}>Share</Text>
        </Button>
      </>}
    </>
  );
}

const style = StyleSheet.create({
  stats: {
    flex: 0,
    flexDirection: 'row',
    paddingHorizontal: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  statCircle: {
    fontSize: 34,
    width: 70,
    height: 70,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    flex: 0,
    alignItems: 'center',
    position: 'absolute',
    top: '85%',
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    backgroundColor: '#fff'
  },
  avatarContainer: {
    flex: 0,
    alignItems: 'center',
    marginTop: 30
  },
  avatar: {
    width: 140,
    height: 140,
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
});

export default Profile;