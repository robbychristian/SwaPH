import React, {useEffect, useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, List, Subheading, Title} from 'react-native-paper';
import axios from 'axios';
import {UserContext} from '../../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ChatRoom = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = useState([]);
  const [chatReady, setChatReady] = useState(false);
  useEffect(() => {
    const formData = new FormData();
    formData.append('id', user.id);
    axios
      .post('https://swapph.online/restapi/GetAllChats', formData)
      .then(response => {
        console.log(response.data.Data.messageList);
        setChatRooms(response.data.Data.messageList);
      })
      .catch(e => {
        console.log(e.response);
      });
  }, []);

  useEffect(() => {
    console.log(chatRooms.length);
    if (chatRooms.length > 0) {
      setChatReady(true);
    } else {
      setChatReady(false);
    }
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '10%'}}>
        <Button
          icon="arrow-left"
          labelStyle={{
            fontSize: 25,
            fontWeight: 'bold',
            flex: 1,
          }}
          color="#000"
          mode="text"
          onPress={() => navigation.goBack()}
        />
      </View>
      {chatReady ? (
        <ScrollView>
          <Title style={{alignSelf: 'center', paddingHorizontal: 25}}>
            MESSAGES
          </Title>
          {chatRooms.map((info, id) => {
            if (info.ReceiverID != user.id) {
              return (
                <TouchableOpacity
                  style={styles.chatContainer}
                  onPress={() => {
                    navigation.navigate('Chat', {
                      chatId: info.ID,
                    });
                  }}>
                  <List.Item
                    title={info.receiverFname + ' ' + info.receiverLname}
                    description={
                      'Chat started: ' +
                      moment(info.LastUpdateDate).format('LL, h:mmA')
                    }
                  />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  style={styles.chatContainer}
                  onPress={() => {
                    navigation.navigate('Chat', {
                      chatId: info.ID,
                    });
                  }}>
                  <List.Item
                    title={info.senderFname + ' ' + info.senderLname}
                    description={
                      'Chat started: ' +
                      moment(info.LastUpdateDate).format('LL, h:mmA')
                    }
                  />
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    paddingHorizontal: 20,
  },
});

export default ChatRoom;
