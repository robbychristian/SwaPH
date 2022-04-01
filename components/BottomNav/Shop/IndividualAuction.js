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
  const [bid, setBid] = useState(0);
  const [newBid, setNewBid] = useState(0);
  const arr = [];

  const id = route.params.id;
  const title = route.params.title;
  const description = route.params.description;
  const highestBid = route.params.highestBid;

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
                  color="blue"
                  onPress={() => submitBid()}>
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
                <TouchableOpacity style={styles.button}>
                  <View style={styles.buttonIn}>
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                      Message Trader
                    </Text>
                  </View>
                </TouchableOpacity>
              </Surface>
            </View>
          );
        })}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="cash-marker"
        color="#FFF"
        onPress={() => setVisible(true)}
      />
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