import React, {useContext, useEffect, useState, useRef} from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Title, TextInput, Paragraph} from 'react-native-paper';
import axios from 'axios';
import {UserContext} from '../../../provider/UserProvider';
import moment from 'moment';

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const chatId = route.params.chatId;
  const user = useContext(UserContext);
  const [allChat, setAllChat] = useState([]);
  const [chatReady, setChatReady] = useState(false);
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState(0);
  const [senderId, setSenderId] = useState(0);
  const scrollRef = useRef();
  const chatRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const formData = new FormData();
      formData.append('chat_ID', chatId);
      formData.append('message_ids', 0);
      formData.append('user_id', user.id);
      axios
        .post('https://swapph.online/restapi/GetMessages', formData)
        .then(response => {
          setAllChat(response.data.Data.chatData);
        })
        .catch(e => {
          console.log(e.response);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (allChat.length > 0) {
      setChatReady(true);
      allChat.map((info, id) => {
        if (info.SenderID != user.id) {
          setReceiverId(info.SenderID);
        } else {
          setSenderId(info.SenderID);
        }
      });
    } else {
      setChatReady(false);
    }
  });

  const sendMessage = () => {
    //console.log(chatId);
    //console.log(parseInt(senderId));
    //console.log(parseInt(receiverId));
    //console.log(message);
    const formData = new FormData();
    formData.append('chatID', chatId);
    formData.append('senderID', parseInt(senderId));
    formData.append('receiverID', parseInt(receiverId));
    formData.append('message', message);
    axios
      .post('https://swapph.online/restapi/SendMessage', formData)
      .then(response => {
        console.log(response.data);
        inputRef.current.clear();
      })
      .catch(e => {
        console.log(e.response);
      });
  };

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
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <ScrollView
            style={{flex: 0.8}}
            ref={scrollRef}
            onContentSizeChange={() => {
              scrollRef.current.scrollToEnd({animated: true});
            }}>
            {allChat.map((info, id) => {
              if (info.SenderID != user.id) {
                return (
                  <View style={{alignItems: 'flex-start'}}>
                    <Paragraph>
                      {' '}
                      {info.senderFname + ' ' + info.senderLname}{' '}
                    </Paragraph>
                    <View style={styles.receiverContainer}>
                      <Title style={styles.receiverText}>
                        {' '}
                        {info.Message}{' '}
                      </Title>
                      <Paragraph style={styles.receiverText}>
                        {' '}
                        {moment(info.DateSent).format('h:mmA, LL')}{' '}
                      </Paragraph>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={{alignItems: 'flex-end'}}>
                    <Paragraph>
                      {' '}
                      {info.senderFname + ' ' + info.senderLname}{' '}
                    </Paragraph>
                    <View style={styles.senderContainer}>
                      <Title style={styles.senderText}> {info.Message} </Title>
                      <Paragraph style={styles.senderText}>
                        {' '}
                        {moment(info.DateSent).format('h:mmA, LL')}{' '}
                      </Paragraph>
                    </View>
                  </View>
                );
              }
            })}
          </ScrollView>
          <View style={styles.inputContainer} ref={chatRef}>
            <TextInput
              mode="outlined"
              ref={inputRef}
              style={styles.inputChat}
              placeholder="Enter your message..."
              outlineColor="#EB805F"
              onChangeText={setMessage}
              onFocus={() => {
                chatRef.current.setNativeProps({
                  style: {
                    flex: 0.25,
                  },
                });
              }}
              onBlur={() => {
                chatRef.current.setNativeProps({
                  style: {
                    flex: 0.13,
                  },
                });
              }}
              right={
                <TextInput.Icon
                  name="send"
                  color="#EB805F"
                  onPress={() => {
                    sendMessage();
                  }}
                />
              }
            />
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  receiverText: {
    color: '#000',
  },
  receiverContainer: {
    backgroundColor: '#e0e0e0',
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
  },
  senderText: {
    color: '#FFF',
  },
  senderContainer: {
    backgroundColor: '#FD7644',
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  },

  inputContainer: {
    flex: 0.13,
  },
  inputChat: {
    backgroundColor: '#FFF',
  },
});

export default Chat;
