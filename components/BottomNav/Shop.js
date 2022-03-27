import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Searchbar, Headline, Paragraph, Card, Title} from 'react-native-paper';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const Shop = () => {
  const [search, setSearch] = useState('');
  const onSearch = query => setSearch(query);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* TOP BAR START */}
        <View style={styles.topBar}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={onSearch}
            value={search}
            inputStyle={{fontSize: 13, padding: 5}}
          />
          <TouchableOpacity style={styles.topButton}>
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

          <View style={styles.tradeCardsContainer}>
            <TouchableOpacity style={{flex: 0.48}}>
              <Card mode="outlined">
                <Card.Cover
                  source={require('../../assets/trade_imgs/tanjiro.jpg')}
                  style={{width: '100%', height: '80%'}}
                />
                <Card.Content
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Paragraph style={{color: '#7a7a7a'}}>
                    Post With Picture
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 0.48}}>
              <Card mode="outlined">
                <Card.Cover
                  source={require('../../assets/trade_imgs/ps5.png')}
                  style={{width: '100%', height: '80%'}}
                />
                <Card.Content
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Paragraph style={{color: '#7a7a7a'}}>Post</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
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

          <View style={styles.auctionCardsContainer}>
            <TouchableOpacity style={{flex: 0.48}}>
              <Card mode="outlined">
                <Card.Cover
                  source={require('../../assets/trade_imgs/laptop.jpg')}
                  style={{width: '100%', height: '80%'}}
                />
                <Card.Content
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Paragraph style={{color: '#7a7a7a'}}>
                    Post for Auction
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 0.48}}>
              <Card mode="outlined">
                <Card.Cover
                  source={require('../../assets/trade_imgs/jordan1.png')}
                  style={{width: '100%', height: '80%'}}
                />
                <Card.Content
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Paragraph style={{color: '#7a7a7a'}}>
                    Post for Auction
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
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
    marginTop: 10,
    justifyContent: 'space-between',
  },

  auctionContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 80,
  },
  auctionTitleContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  auctionCardsContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    marginTop: 10,
    justifyContent: 'space-between',
  },
});

export default Shop;
