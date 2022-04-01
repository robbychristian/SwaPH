import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  Button,
  Title,
  Paragraph,
  Surface,
  Subheading,
} from 'react-native-paper';
import {UserContext} from '../../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const MyAccount = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [barterPost, setBarterPost] = useState([]);
  const [barterImages, setBarterImages] = useState([]);
  const [auctionPost, setAuctionPost] = useState([]);
  const [auctionImages, setAuctionImages] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const fetchPosts = () => {
    axios
      .get('https://swapph.online/restapi/GetTradePostByID/' + user.id)
      .then(response => {
        console.log(response.data.Data);
      })
      .catch(e => {
        console.log(e.response);
      });
  };
  const fetchProfile = () => {
    axios
      .get('https://swapph.online/restapi/GetUserProfileByID/' + user.id)
      .then(response => {
        console.log(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts();
    fetchProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color="blue" />
          </View>
        </View>
      </Modal>
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
      <ScrollView>
        <View style={styles.headerContainer}>
          <Title style={{fontSize: 25}}>
            Your <Title style={{fontSize: 25, color: '#EB805F'}}>Profile</Title>
          </Title>
        </View>

        <Subheading style={{paddingLeft: 20}}>Account Details: </Subheading>
        <View style={styles.bodyContainer}>
          <Surface style={styles.surface}>
            <View style={{flex: 1, flexDirection: 'row'}}></View>
          </Surface>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  surface: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: '80%',
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 8,
  },
});

export default MyAccount;
