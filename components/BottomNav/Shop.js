import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Searchbar, Headline, Paragraph, Card, Title} from 'react-native-paper';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {UserContext} from '../../provider/UserProvider';
import axios from 'axios';

const Shop = () => {
  const user = useContext(UserContext);
  const [search, setSearch] = useState('');
  const onSearch = query => setSearch(query);
  const navigation = useNavigation();
  const [tradeItems, setTradeItems] = useState([]);
  const [tradeImages, setTradeImages] = useState([]);
  const [auctionItems, setAuctionItems] = useState([]);
  const [auctionImages, setAuctionImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get('https://swapph.online/restapi/GetHomePage')
      .then(response => {
        setAuctionItems(response.data.Data.auctions);
        //setAuctionImages(response.data.Data.aimage);
        setTradeItems(response.data.Data.barters);
        //setTradeImages(response.data.Data.bimage);
        //console.log(auctionImages);
      })
      .then(response => {
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        Alert.alert(
          'Error!',
          "There's an error fetching the data. Please make sure you have internet connection!",
        );
        console.log(e);
      });
  };
  const onRefresh = () => {
    fetchData();
  };
  //* ON MOUNT *//
  useEffect(() => {
    fetchData();
    onRefresh();
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* TOP BAR START */}
        <View style={styles.topBar}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={onSearch}
            value={search}
            inputStyle={{fontSize: 13, padding: 5}}
          />
          <TouchableOpacity
            style={styles.topButton}
            onPress={() => {
              navigation.push('ChatRoom');
            }}>
            <Icon name="comment-processing-outline" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Icon name="bell-outline" size={20} />
          </TouchableOpacity>
        </View>
        {/* TOP BAR END */}

        {/* JUMBOTRON START */}
        <View style={styles.jumbotronContainer}>
          <Paragraph style={styles.jumbotronDescription}>
            Trade, Sell & Auction
          </Paragraph>
          <Headline style={styles.jumbotronTitle}>Welcome to SwaPH!</Headline>
        </View>
        {/* JUMBOTRON END */}

        {/* CATEGORY START */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryItem}>
            <Icon
              name="sale"
              size={25}
              color="#BB8370"
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryTitle}>Sale</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <Icon
              name="bank"
              size={25}
              color="#BB8370"
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryTitle}>Bill</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <Icon
              name="gamepad-variant"
              size={25}
              color="#BB8370"
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryTitle}>Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <Icon
              name="gift"
              size={25}
              color="#BB8370"
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryTitle}>Gift</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <Icon
              name="more"
              size={25}
              color="#BB8370"
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryTitle}>More</Text>
          </TouchableOpacity>
        </View>
        {/* CATEGORY END */}

        {/* TRADE START */}
        <View style={styles.tradeContainer}>
          <View style={styles.tradeTitleContainer}>
            <Headline style={{flex: 0.5, fontSize: 20}}>
              Items for Trade
            </Headline>
            <TouchableOpacity
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: 10,
              }}>
              <Paragraph style={{color: '#a8a8a8'}}>See More</Paragraph>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={{height: 200}}>
            <View style={styles.tradeCardsContainer}>
              {tradeItems.map((info, id) => {
                return (
                  <TouchableOpacity
                    style={{
                      flex: 0.48,
                      marginRight: 10,
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
                    <Card mode="outlined" style={{width: 200, height: 200}}>
                      <Card.Cover
                        source={{
                          uri: 'https://swapph.online/' + info.ImageLink,
                        }}
                        style={{width: '100%', height: '75%'}}
                      />
                      <Card.Content
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Paragraph
                          style={{color: '#7a7a7a', textAlign: 'center'}}>
                          {info.Title}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        {/* TRADE END */}

        {/* AUCTION START */}
        <View style={styles.auctionContainer}>
          <View style={styles.auctionTitleContainer}>
            <Headline style={{flex: 0.5, fontSize: 20}}>
              Items for Auction
            </Headline>
            <TouchableOpacity
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: 10,
              }}>
              <Paragraph style={{color: '#a8a8a8'}}>See More</Paragraph>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} style={{height: 200}}>
            <View style={styles.auctionCardsContainer}>
              {auctionItems.map((info, id) => {
                return (
                  <TouchableOpacity
                    style={{
                      flex: 0.48,
                      marginRight: 10,
                      maxWidth: '100%',
                      width: '100%',
                    }}
                    onPress={() => {
                      navigation.navigate('IndividualAuction', {
                        id: info.AuctionID,
                        title: info.Title,
                        description: info.Description,
                        postedDate: info.PostedDate,
                        isClosed: info.isClosed,
                        closedDate: info.ClosedDate,
                        EoBDate: info.EoBDate,
                        askingPrice: info.AskingPrice,
                        isPaid: info.isPaid,
                        highestBid: info.HighestBid,
                        highestBidderId: info.HighestBidderID,
                        traderId: info.TraderID,
                        lastUpdateId: info.LastUpdateID,
                        lastUpdateDate: info.LastUpdateDate,
                      });
                    }}>
                    <Card mode="outlined" style={{width: 200, height: 200}}>
                      <Card.Cover
                        source={{
                          uri: 'https://swapph.online/' + info.ImageLink,
                        }}
                        style={{width: '100%', height: '75%'}}
                      />
                      <Card.Content
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Paragraph
                          style={{color: '#7a7a7a', textAlign: 'center'}}>
                          {info.Title}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        {/* AUCTION END */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flex: 0.1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 20,
  },
  searchBar: {
    width: '70%',
    height: '70%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  topButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    height: '70%',
    width: '10%',
    borderRadius: 10,
    marginLeft: 15,
    borderColor: '#eaeaea',
    borderWidth: 1,
  },

  jumbotronContainer: {
    marginHorizontal: 10,
    marginBottom: 25,
    paddingHorizontal: 10,
    backgroundColor: '#4B3299',
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
  },
  jumbotronTitle: {
    marginLeft: 10,
    color: 'white',
    fontWeight: '700',
    paddingBottom: 10,
  },
  jumbotronDescription: {
    paddingTop: 10,
    marginLeft: 10,
    color: 'white',
    fontWeight: '100',
    fontSize: 13,
  },

  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  categoryItem: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    flex: 0.5,
    backgroundColor: '#FFECE0',
    padding: 10,
    borderRadius: 8,
  },
  categoryTitle: {
    flex: 0.5,
    fontSize: 14,
  },

  tradeContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  tradeTitleContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tradeCardsContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },

  auctionContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  auctionTitleContainer: {
    flex: 0.1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  auctionCardsContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
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

export default Shop;
