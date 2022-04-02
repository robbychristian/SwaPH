import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Avatar, FAB, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../provider/UserProvider';

const Profile = () => {
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(user.profilePicture);
  }, []);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity>
          <Avatar.Image
            size={100}
            source={{uri: 'https://swapph.online/' + user.profilePicture}}
          />
          <FAB style={styles.fab} small icon="camera-outline" color="#a6a6a6" />
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.push('MyAccount')}>
          <Icon name="account" size={30} color="#EB805F" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#FD7644'}}>
            My Account
          </Paragraph>
          <Icon
            name="arrow-right-drop-circle-outline"
            style={{
              flex: 0.1,
              justifyContent: 'flex-end',
            }}
            size={30}
            color="#EB805F"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => {
            navigation.navigate('Report');
          }}>
          <Icon name="email" size={30} color="#EB805F" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#FD7644'}}>
            Submit Report
          </Paragraph>
          <Icon
            name="arrow-right-drop-circle-outline"
            style={{
              flex: 0.1,
              justifyContent: 'flex-end',
            }}
            size={30}
            color="#EB805F"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate('CustomerService')}>
          <Icon name="phone" size={30} color="#EB805F" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#FD7644'}}>
            Contact Customer Service
          </Paragraph>
          <Icon
            name="arrow-right-drop-circle-outline"
            style={{
              flex: 0.1,
              justifyContent: 'flex-end',
            }}
            size={30}
            color="#EB805F"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.push('Payment')}>
          <Icon
            name="cash-multiple"
            size={30}
            color="#EB805F"
            style={{flex: 0.2}}
          />
          <Paragraph style={{flex: 0.7, color: '#FD7644'}}>Payment</Paragraph>
          <Icon
            name="arrow-right-drop-circle-outline"
            style={{
              flex: 0.1,
              justifyContent: 'flex-end',
            }}
            size={30}
            color="#EB805F"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
          <Icon name="logout" size={30} color="#EB805F" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#FD7644'}}>Logout</Paragraph>
          <Icon
            name="arrow-right-drop-circle-outline"
            style={{
              flex: 0.1,
              justifyContent: 'flex-end',
            }}
            size={30}
            color="#EB805F"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  actionContainer: {
    flex: 0.65,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#e8e8e8',
  },
  optionContainer: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    height: '16%',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
});

export default Profile;
