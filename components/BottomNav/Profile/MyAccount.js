import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {
  Button,
  Title,
  Paragraph,
  Surface,
  Subheading,
  Caption,
  Avatar,
  FAB,
  Card,
} from 'react-native-paper';
import {UserContext} from '../../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';

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
        setBarterPost(response.data.Data.barterPosts);
        setBarterImages(response.data.Data.barterImages);
        setAuctionPost(response.data.Data.auctionPosts);
        setAuctionImages(response.data.Data.auctionImages);
      })
      .catch(e => {
        console.log(e.response);
      });
  };
  const fetchProfile = () => {
    axios
      .get('https://swapph.online/restapi/GetUserProfileByID/' + user.id)
      .then(response => {
        setUserProfile(response.data.Data);
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
        <View style={styles.avatarContainer}>
          <TouchableOpacity>
            <Avatar.Image
              size={100}
              source={{uri: 'https://swapph.online/' + user.profilePicture}}
            />
            <FAB
              style={styles.fab}
              small
              icon="camera-outline"
              color="#a6a6a6"
            />
          </TouchableOpacity>
        </View>

        <Subheading style={{paddingLeft: 20, marginBottom: 15}}>
          Account Details:{' '}
        </Subheading>
        <View style={styles.bodyContainer}>
          <Surface style={styles.surface}>
            <View style={{flex: 1, flexDirection: 'row', height: '100%'}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Caption>Full Name:</Caption>
                <Subheading>
                  {userProfile.Fname} {userProfile.Lname}
                </Subheading>
                <Caption>Birthday:</Caption>
                <Subheading>
                  {moment(userProfile.Birthday).format('LL')}
                </Subheading>
                <Caption>Address:</Caption>
                <Subheading>
                  {userProfile.Street}, {userProfile.Barangay},{' '}
                  {userProfile.City} || {userProfile.Zip}
                </Subheading>
                <Caption>Region:</Caption>
                <Subheading>{userProfile.Region}</Subheading>
              </View>
            </View>
          </Surface>
        </View>
        <Subheading style={{paddingLeft: 20, marginTop: 10}}>
          Barters Posted:{' '}
        </Subheading>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {barterPost.map((info, index) => {
            let imgLink = barterImages[index];
            return (
              <TouchableOpacity
                style={{
                  flex: 0.48,
                  alignItems: 'center',
                  marginRight: 10,
                  marginBottom: 10,
                  maxWidth: '100%',
                  width: '100%',
                }}
                onPress={() => {
                  navigation.navigate('IndividualTrade', {
                    userId: user.id,
                    id: info.BarterID,
                    title: info.Title,
                    description: info.Description,
                    postedDate: info.PostedDate,
                    isClosed: info.isClosed,
                    closeReason: info.CloseReason,
                    closeComment: info.CloseComment,
                    closeById: info.ClosedByID,
                    closedDate: info.ClosedDate,
                    traderId: info.TraderID,
                  });
                }}>
                <Card mode="outlined" style={{width: 300, height: 300}}>
                  <Card.Cover
                    source={{
                      uri: 'https://swapph.online/' + imgLink,
                    }}
                    style={{width: '100%', height: '75%'}}
                  />
                  <Card.Content
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Paragraph style={{color: '#7a7a7a', textAlign: 'center'}}>
                      {info.Title}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
        <Subheading style={{paddingLeft: 20, marginTop: 10}}>
          Auctions Posted:{' '}
        </Subheading>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {auctionPost.map((info, index) => {
            let imgLink = auctionImages[index];
            return (
              <TouchableOpacity
                style={{
                  flex: 0.48,
                  alignItems: 'center',
                  marginRight: 10,
                  marginBottom: 10,
                  maxWidth: '100%',
                  width: '100%',
                }}
                onPress={() => {
                  navigation.navigate('IndividualTrade', {
                    userId: user.id,
                    id: info.BarterID,
                    title: info.Title,
                    description: info.Description,
                    postedDate: info.PostedDate,
                    isClosed: info.isClosed,
                    closeReason: info.CloseReason,
                    closeComment: info.CloseComment,
                    closeById: info.ClosedByID,
                    closedDate: info.ClosedDate,
                    traderId: info.TraderID,
                  });
                }}>
                <Card mode="outlined" style={{width: 300, height: 300}}>
                  <Card.Cover
                    source={{
                      uri: 'https://swapph.online/' + imgLink,
                    }}
                    style={{width: '100%', height: '75%'}}
                  />
                  <Card.Content
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Paragraph style={{color: '#7a7a7a', textAlign: 'center'}}>
                      {info.Title}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })}
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
  avatarContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#e8e8e8',
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: '100%',
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 8,
  },
  surfaceCard: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '80%',
    maxHeight: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 8,
  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default MyAccount;
