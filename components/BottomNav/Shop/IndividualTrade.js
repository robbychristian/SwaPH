import React, {useEffect, useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Paragraph,
  Title,
  Headline,
  Subheading,
  Surface,
  Divider,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserContext} from '../../../provider/UserProvider';
import axios from 'axios';
import {Card} from 'react-native-paper';
import Slideshow from 'react-native-image-slider-show';

const IndividualTrade = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [traderData, setTraderData] = useState([]);
  const [comments, setComments] = useState([]);
  const arr = [];
  const [slideShow, setSlideShow] = useState([]);
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [mounted, isMounted] = useState(false);

  //ALL PASSED DATA
  const id = route.params.id;
  const title = route.params.title;
  const description = route.params.description;
  const postedDate = route.params.postedDate;
  const isClosed = route.params.isClosed;
  const closeReason = route.params.closeReason;
  const closeComment = route.params.closeComment;
  const closeById = route.params.closeById;
  const closedDate = route.params.closedDate;
  const traderId = route.params.traderId;
  const formData = new FormData();
  formData.append('post_id', id);
  formData.append('type', 'barter');

  const extractImage = object => {
    object.map((info, id) => {
      arr.push({
        url: 'https://swapph.online/' + info.Link,
      });
    });
    setSlideShow(arr);
  };

  // const fetchData = () => {
  //   setLoading(true);
  //   console.log('first run');
  //   axios
  //     .post('https://swapph.online/restapi/GetPost', formData)
  //     .then(response => {
  //       //console.log(response.data.Data.imageData);
  //       setImageData(response.data.Data.imageData);
  //       setTraderData(response.data.Data.traderData);
  //       setPostData(response.data.Data.postData);
  //       extractImage(imageData);
  //     })
  //     .then(response => {
  //       setLoading(false);
  //     })
  //     .catch(e => {
  //       console.log(e.response);
  //       setLoading(false);
  //     });
  // };
  const fetchData = () => {
    setLoading(true);
    axios
      .post('https://swapph.online/restapi/GetPost', formData)
      .then(response => {
        //console.log(response.data.Data.imageData);
        setImageData(response.data.Data.imageData);
        setTraderData(response.data.Data.traderData);
        setComments(response.data.Data.comments);
        setPostData(response.data.Data.postData);
        extractImage(imageData);
      })
      .then(response => {
        setLoading(false);
      })
      .catch(e => {
        console.log(e.response);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
    onRefresh();
  }, []);

  const onRefresh = () => {
    setSlideShow(arr);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: 1, backgroundColor: '#FFF'}}
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

        {isMounted ? (
          <Slideshow dataSource={slideShow} height={300} />
        ) : (
          <View></View>
        )}

        {traderData.map((info, id) => {
          return (
            <View style={styles.headerContainer}>
              <Title style={{textAlign: 'center'}}>{title}</Title>
              <Paragraph style={{textAlign: 'left'}}>
                <Paragraph style={{fontWeight: 'bold'}}>Posted By:</Paragraph>{' '}
                {info.Fname + ' ' + info.Lname}
              </Paragraph>
            </View>
          );
        })}

        {postData.map((info, id) => {
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
                    Item Details: {info.ItemDetails + '\n'}
                  </Paragraph>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity style={styles.buttonIn}>
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                      Message Trader
                    </Text>
                  </TouchableOpacity>
                </View>
              </Surface>
            </View>
          );
        })}

        {isMounted ? (
          <Subheading
            style={{marginHorizontal: 25, fontSize: 20, marginTop: 10}}>
            Comments:{' '}
          </Subheading>
        ) : (
          <View></View>
        )}
        {comments ? (
          <View>
            {comments.map((info, id) => {
              return (
                <View style={styles.commentContainer}>
                  <Paragraph style={{color: '#080808', fontWeight: 'bold'}}>
                    {info.Fname} {info.Lname}
                  </Paragraph>
                  <Paragraph style={{color: '#808080'}}>
                    {info.Comment}
                  </Paragraph>
                  <Paragraph
                    style={{
                      color: '#808080',
                      textAlign: 'right',
                      fontSize: 10,
                    }}>
                    {info.PostedDate}
                  </Paragraph>
                </View>
              );
            })}
          </View>
        ) : (
          <View>
            <View style={styles.commentContainer}>
              <Paragraph style={{color: '#080808', fontWeight: 'bold'}}>
                There are no comments to show
              </Paragraph>
            </View>
          </View>
        )}
      </ScrollView>
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
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
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
});

export default IndividualTrade;
