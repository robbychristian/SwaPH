import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  Paragraph,
  Title,
  Surface,
  Subheading,
  FAB,
  TextInput,
  Button,
  Snackbar,
} from 'react-native-paper';
import {UserContext} from '../../../provider/UserProvider';
import {useNavigation, useRoute} from '@react-navigation/native';
import Slideshow from 'react-native-image-slider-show';
import axios from 'axios';

const IndividualAuction = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [imageData, setImageData] = useState([]);
  const [auctionData, setAuctionData] = useState([]);
  const [traderData, setTraderData] = useState([]);
  const [slideShow, setSlideShow] = useState([]);
  const [visible, setVisible] = useState(false);
  //FOR MESSAGING
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [bid, setBid] = useState(0);
  const [newBid, setNewBid] = useState(0);
  const arr = [];

  //FOR COMMENT
  const [showComment, setShowComment] = useState(false);
  const [addComment, setAddComment] = useState('');
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const id = route.params.id;
  const title = route.params.title;
  const description = route.params.description;
  const highestBid = route.params.highestBid;
  const traderId = route.params.traderId;

  const formdata = new FormData();
  formdata.append('post_id', id);
  formdata.append('type', 'auction');

  const biddingData = new FormData();
  biddingData.append('postID', id);
  biddingData.append('userID', user.id);
  biddingData.append('bid', bid);

  const submitBid = () => {
    if (bid < highestBid) {
      Alert.alert(
        'Bidding Error!',
        'Please put a higher bid than the current one!',
      );
    } else {
      axios
        .post('https://swapph.online/restapi/PlaceBid', biddingData)
        .then(response => {
          newBid(bid);
        })
        .then(response => {
          setVisible(false);
        })
        .catch(e => {
          console.log(e.response);
        });
      Alert.alert('Bid Submitted!', 'Bid has been successfully submitted!');
      navigation.navigate('HomeStack');
    }
    setVisible(false);
  };

  const onRefresh = () => {
    setSlideShow(arr);
    fetchData();
  };
  const submitComment = () => {
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('postID', id);
    formData.append('comment', addComment);
    formData.append('posttype', 'barter');
    axios
      .post('https://swapph.online/restapi/AddComment', formData)
      .then(response => {
        console.log(response.data);
        setSnackBarVisible(true);
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  const fetchData = () => {
    setLoading(true);
    axios
      .post('https://swapph.online/restapi/GetPost', formdata)
      .then(response => {
        setImageData(response.data.Data.imageData);
        setAuctionData(response.data.Data.postData);
        setTraderData(response.data.Data.traderData);
        console.log(highestBid);
        imageData.map((info, data) => {
          arr.push({
            url: 'https://swapph.online/' + info.Link,
          });
        });
        setSlideShow(arr);
        setLoading(false);
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  //CREATING MEESAGE THROUGH PM
  const createMessage = () => {
    if (message == '') {
      Alert.alert('Invalid Comment!', 'Your comment should not be empty!');
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('receiverID', traderId);
      formData.append('message', message);
      axios
        .post('https://swapph.online/restapi/CreateNewMessage', formData)
        .then(response => {
          setLoading(false);
          navigation.navigate('Chat', {
            chatId: response.data,
            receiverID: traderId,
            senderID: parseInt(user.id),
          });
        })
        .catch(e => {
          Alert.alert(
            'Error!',
            'There was an error sending your message. Make sure you have internet connection!',
          );
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [newBid]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Modal transparent={true} visible={loading}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating={loading} color="blue" />
            </View>
          </View>
        </Modal>

        {/* FOR BIDDING */}
        <Modal transparent={true} visible={visible}>
          <View style={styles.modalBackground}>
            <View style={styles.formWrapper}>
              <Title>Place Your Bid</Title>
              <TextInput
                keyboardType="number-pad"
                activeOutlineColor="#808080"
                style={styles.input}
                mode="outlined"
                onChangeText={setBid}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Button
                  style={{marginTop: 10}}
                  mode="outlined"
                  color="black"
                  onPress={() => setVisible(false)}>
                  <Text style={{color: 'gray'}}>Cancel</Text>
                </Button>
                <Button
                  style={{marginTop: 10}}
                  mode="contained"
                  color="#FD7644"
                  onPress={() => submitBid()}>
                  <Text style={{color: '#FFF'}}>Submit</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        {/* COMMENT ON POST START */}
        <Modal transparent={true} visible={showComment}>
          <View style={styles.modalBackground}>
            <View style={styles.formWrapper}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Button
                  icon="close"
                  labelStyle={{
                    fontSize: 15,
                    height: 1,
                    fontWeight: 'bold',
                    marginRight: -10,
                  }}
                  color="#000"
                  mode="text"
                  onPress={() => setShowComment(false)}
                />
              </View>
              <Title style={{textAlign: 'center', marginTop: -10}}>
                Comment on Post
              </Title>
              <View style={styles.termsContainer}>
                <TextInput
                  mode="outlined"
                  style={{
                    color: '#fff',
                    width: '80%',
                    backgroundColor: '#FFF',
                    height: 50,
                    alignSelf: 'center',
                  }}
                  onChangeText={setAddComment}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Button
                  style={{marginTop: 10}}
                  mode="contained"
                  color="#FD7644"
                  onPress={() => submitComment()}>
                  <Text style={{color: '#FFF'}}>Submit</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        {/* COMMENT ON POST END */}
        {/* FOR MESSAGING */}
        <Modal transparent={true} visible={messageVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.formWrapper}>
              <Title>Type your message</Title>
              <TextInput
                activeOutlineColor="#808080"
                style={styles.input}
                mode="outlined"
                onChangeText={setMessage}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                <Button
                  style={{marginTop: 10}}
                  mode="outlined"
                  color="black"
                  onPress={() => setMessageVisible(false)}>
                  <Text style={{color: 'gray'}}>Cancel</Text>
                </Button>
                <Button
                  style={{marginTop: 10}}
                  mode="contained"
                  color="#FD7644"
                  onPress={() => createMessage()}>
                  <Text style={{color: '#FFF'}}>Submit</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <Slideshow dataSource={slideShow} height={300} />
        {traderData.map((info, id) => {
          return (
            <View style={styles.headerContainer}>
              <Title style={{textAlign: 'center'}}>{title}</Title>
              <Paragraph style={{textAlign: 'center'}}>
                <Paragraph style={{fontWeight: 'bold'}}>Posted By:</Paragraph>{' '}
                {info.Fname + ' ' + info.Lname}
              </Paragraph>
            </View>
          );
        })}

        {auctionData.map((info, id) => {
          return (
            <View style={styles.bodyContainer}>
              <Surface style={styles.surface}>
                <Subheading style={{fontSize: 20}}>Post Details: </Subheading>
                <View style={{paddingHorizontal: 15}}>
                  <Paragraph style={{color: '#808080'}}>
                    {description + '\n'}
                  </Paragraph>
                  <Paragraph style={{color: '#808080'}}>
                    Item Name: {info.ItemName + '\n'}
                  </Paragraph>
                  <Paragraph style={{color: '#808080'}}>
                    Current Highest Bid: {info.HighestBid + '\n'}
                  </Paragraph>
                </View>
                {traderId == user.id ? (
                  <View></View>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setMessageVisible(true)}>
                    <View style={styles.buttonIn}>
                      <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                        Message Trader
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </Surface>
            </View>
          );
        })}
      </ScrollView>
      {traderId == user.id ? (
        <View></View>
      ) : (
        <FAB
          style={styles.fab}
          icon="cash-marker"
          color="#FFF"
          onPress={() => setVisible(true)}
        />
      )}
      <Snackbar
        visible={snackBarVisible}
        duration={3000}
        onDismiss={() => setSnackBarVisible(false)}>
        Comment added!
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  headerContainer: {
    flex: 0.45,
    paddingHorizontal: 50,
  },
  bodyContainer: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
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
  formWrapper: {
    backgroundColor: '#FFFFFF',
    width: '75%',
    height: 200,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  commentContainer: {
    flex: 0.45,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
  input: {
    color: '#fff',
    width: '80%',
    backgroundColor: '#FFF',
    height: 50,
  },

  button: {
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FD7644',
    height: 40,
    width: '40%',
  },
  buttonIN: {
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FF805D',
  },

  surface: {
    padding: 8,
    paddingHorizontal: 15,
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    elevation: 12,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#EB805F',
  },
});

export default IndividualAuction;
