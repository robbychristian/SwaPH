import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Text, Card, Title, Paragraph, FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../provider/UserProvider';

const LiveStreamRoom = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [live, setLive] = useState([]);
  const [status, setStatus] = useState(false);

  const joinLive = liveId => {
    const formData = new FormData();
    formData.append('live_id', liveId);
    formData.append('user_id', user.id);
    axios
      .post('https://swapph.online/restapi/GenerateWatchJWT/', formData)
      .then(response => {
        console.log(response.data);
        navigation.navigate('LiveStream', {
          roomKey: response.data.data.room_key,
          jwtToken: response.data.data.jwt_token,
          liveId: response.data.data.liveid,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshLive = () => {
    axios
      .get('https://swapph.online/restapi/GetAllLiveStream/')
      .then(response => {
        setLive([]);
        setLive(response.data.Data);
        if (live == false) {
          setStatus(false);
        } else {
          setStatus(true);
        }
        console.log('IS SET');
      });
  };

  useEffect(() => {
    axios
      .get('https://swapph.online/restapi/GetAllLiveStream/')
      .then(response => {
        setLive([]);
        setLive(response.data.Data);
        if (live == false) {
          setStatus(false);
        } else {
          setStatus(true);
        }
        console.log('IS SET');
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <Paragraph style={{color: '#fff'}}>
            Hello, {'\n'}
            <Title style={{color: '#fff'}}>
              {user.fname} {user.lname}
            </Title>
          </Paragraph>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonIn} onPress={refreshLive}>
            <Text style={{color: '#FFE6D8', fontWeight: 'bold'}}>
              Get all Live
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {live ? (
        <View style={styles.bodyBGContainer}>
          <ScrollView style={styles.bodyInnerContainer}>
            {live.map((info, id) => {
              return (
                <TouchableOpacity
                  style={{paddingHorizontal: 30, paddingVertical: 10}}
                  onPress={() => joinLive(info.LiveID)}>
                  <Card>
                    <Card.Cover
                      source={{
                        uri: 'https://swapph.online/' + info.original_file_name,
                      }}
                    />
                    <Card.Content>
                      <Title>{info.Title}</Title>
                      <Paragraph>{info.Description}</Paragraph>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.bodyBGContainer}>
          <View style={styles.bodyInnerContainer}>
            <Text>No stream available</Text>
          </View>
        </View>
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateLiveStream')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4B3299',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: -20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    flex: 0.7,
    flexDirection: 'column',
  },
  button: {
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#7253C0',
    height: '45%',
  },
  buttonIN: {
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FF805D',
  },

  bodyBGContainer: {
    flex: 0.85,
    backgroundColor: '#4B3299',
  },
  bodyInnerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    padding: 20,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#EB805F',
  },
});

export default LiveStreamRoom;
