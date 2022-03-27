import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BottomNavigation, Surface} from 'react-native-paper';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Profile from './BottomNav/Profile';
import Shop from './BottomNav/Shop';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

const ProfileScreen = () => {
  return <Profile />;
};

const ShopScreen = () => {
  return <Shop />;
};

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const [routes] = useState([
    {key: 'shop', title: 'Shop', icon: 'home'},
    {key: 'profile', title: 'Profile', icon: 'account'},
  ]);
  const renderScreen = BottomNavigation.SceneMap({
    shop: ShopScreen,
    profile: ProfileScreen,
  });

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <BottomNavigation
        barStyle={{backgroundColor: '#FFF'}}
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScreen}
        sceneAnimationEnabled={true}
        shifting={true}
        activeColor="#FD7644"
      />
      {isVisible ? (
        <Surface
          style={{
            position: 'absolute',
            bottom: 55,
            left: '25%',
            right: '25%',
            justifyContent: 'center',
            backgroundColor: '#FFF',
            paddingHorizontal: 15,
            elevation: 6,
          }}>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
            }}>
            <Text>Create Post for Trade</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
            }}>
            <Text>Create Post for Auction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
            }}
            onPress={() => navigation.push('LiveStreamRoom')}>
            <Text>Start Live Selling</Text>
          </TouchableOpacity>
        </Surface>
      ) : (
        <View></View>
      )}
      <HideWithKeyboard>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 10,
            right: '45%',
            backgroundColor: '#FD7644',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#FD7644',
          }}
          onPress={() => {
            if (isVisible) {
              setVisible(false);
            } else {
              setVisible(true);
            }
          }}>
          <Icon name="plus" size={35} color="#fff" />
        </TouchableOpacity>
      </HideWithKeyboard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

export default Home;
