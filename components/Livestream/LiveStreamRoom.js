import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../provider/UserProvider';

const LiveStreamRoom = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [newStream, setNewStream] = useState(true);
  const [live, setLive] = useState([]);
  const onFetchNew = () => {
    if (newStream) setNewStream(false);
    else setNewStream(true);
  };

  const joinLive = liveId => {
    const formData = new FormData();
    formData.append('live_id', liveId);
    formData.append('user_id', user.id);
    axios
      .post('http://10.0.2.2/SwapPH/restapi/generateWatchJWT/', formData)
      .then(response => {
        // console.log(response.data.data.jwt_token);
        // console.log(response.data.data.liveid);
        // console.log(response.data.data.room_key);
        navigation.navigate('LiveStream', {
          roomKey: response.data.data.room_key,
          jwtToken: response.data.data.jwt_token,
          liveId: response.data.data.liveid,
        });
      })
      .catch(e => {
        console.log(e.response.data);
      });
  };

  useEffect(() => {
    axios
      .get('http://10.0.2.2/SwapPH/restapi/getAllLiveStream/')
      .then(response => {
        setLive([]);
        setLive(response.data.Data);

        console.log(live);
      });
  }, [newStream]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity onPress={onFetchNew}>
        <Text>Get all Live</Text>
      </TouchableOpacity>
      {live.map((info, id) => {
        return (
          <TouchableOpacity onPress={() => joinLive(info.LiveID)}>
            <Text>{info.LiveID}</Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default LiveStreamRoom;
