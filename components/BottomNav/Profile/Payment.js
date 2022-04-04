import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  Title,
  Button,
  Paragraph,
  Card,
  Caption,
  Headline,
} from 'react-native-paper';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

import {WebView} from 'react-native-webview';
import {UserContext} from '../../../provider/UserProvider';

const Payment = () => {
  const [showGateway, setShowGateway] = useState(false);
  const [post, setPost] = useState([]);
  const [screenReady, setScreenReady] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    axios
      .get('https://swapph.online/restapi/GetHighestBids/' + user.id)
      .then(response => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch(e => {
        console.log(e.response);
      });
  }, []);

  useEffect(() => {
    if (post.length > 0) {
      setScreenReady(true);
    } else {
      setScreenReady(false);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Title style={styles.title}>
          Auction to
          <Title style={{fontSize: 25, color: '#EB805F'}}> Pay</Title>
        </Title>
        <Paragraph style={styles.description}>
          You will be redirected to our Website{' '}
          <Paragraph
            style={{
              color: '#EB805F',
              textAlign: 'center',
              paddingHorizontal: 30,
            }}>
            https://swapph.online/
          </Paragraph>{' '}
          to pay for the auction you won!
        </Paragraph>
      </View>
      {setScreenReady ? (
        <View>
          {post.map((info, id) => {
            return (
              <ScrollView>
                <View style={{alignItems: 'center'}}>
                  <Modal
                    visible={showGateway}
                    onDismiss={() => setShowGateway(false)}
                    onRequestClose={() => setShowGateway(false)}
                    animationType={'fade'}
                    transparent>
                    <View style={styles.webViewCon}>
                      <View style={styles.wbHead}>
                        <TouchableOpacity
                          style={{padding: 13}}
                          onPress={() =>
                            setShowGateway(false)
                          }></TouchableOpacity>
                        <Text
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#00457C',
                          }}>
                          PayPal GateWay
                        </Text>
                        <View style={{padding: 13}}>
                          <ActivityIndicator size={24} color={'#00457C'} />
                        </View>
                      </View>
                      <WebView
                        source={{
                          uri:
                            'https://swapph.online/Posting/viewPost/' +
                            info.AuctionID +
                            '/auction',
                        }}
                        style={{flex: 1}}
                      />
                    </View>
                  </Modal>
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
                      setShowGateway(true);
                    }}>
                    <Card mode="outlined" style={{width: '100%', height: 100}}>
                      <Card.Content
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Title
                          style={{
                            color: '#FD7644',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                          }}>
                          Auction Title:{' '}
                          <Headline
                            style={{
                              color: '#000',
                              textAlign: 'center',
                              fontSize: 16,
                            }}>
                            {info.Title}
                          </Headline>
                        </Title>
                        <Paragraph
                          style={{color: '#7a7a7a', textAlign: 'center'}}>
                          Price: {info.HighestBid}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            );
          })}
        </View>
      ) : (
        <View>
          <View
            style={{
              flex: 0.48,
              alignItems: 'center',
              marginRight: 10,
              marginBottom: 10,
              maxWidth: '100%',
              width: '100%',
            }}>
            <Card mode="outlined" style={{width: '100%', height: 100}}>
              <Card.Content
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Title
                  style={{
                    color: '#FD7644',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  No Items to
                  <Headline
                    style={{
                      color: '#000',
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    {' '}
                    Display
                  </Headline>
                </Title>
                <Paragraph style={{color: '#7a7a7a', textAlign: 'center'}}>
                  No biddings were made in this account yet.
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },

  biddingContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
  },

  headerContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
  },
  description: {
    color: '#808080',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});

export default Payment;
