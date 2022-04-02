import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Paragraph, Title, TextInput, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {UserContext} from '../../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';

const Report = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [item, setItem] = useState();
  const [itemName, setItemName] = useState('');
  const [itemUri, setItemUri] = useState('');
  const [itemSize, setItemSize] = useState();
  const itemImage = () => {
    const options = {
      storageOptions: {
        saveToPhotos: true,
        mediaType: 'photo',
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled uploading Valid ID');
      } else if (response.error) {
        console.log('error uploading: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log(response);
        setItem(response);
        setItemUri(response.assets[0].uri);
        setItemName(response.assets[0].fileName);
        setItemSize(response.assets[0].fileSize);
        //console.log(response.assets[0].uri);
      }
    });
  };
  const requestStoragePermission = () => {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to Access Storage',
          message: 'Allow SwaPH to access the camera to take pictures',
          buttonPositive: 'OK',
          buttonNegative: 'No',
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const submitReport = () => {
    setLoading(true);
    if (title == '' || desc == '' || itemUri == '') {
      Alert.alert(
        'Input Error!',
        'Please fill in the necessary information for your report!',
      );
    } else {
      const formData = new FormData();
      let image = {
        uri: itemUri,
        type: 'multipart/form-data',
        name: itemName,
      };
      formData.append('user_id', user.id);
      formData.append('title', title);
      formData.append('description', desc);
      formData.append('threadimage', image);
      axios
        .post('https://swapph.online/restapi/CreateNewTicket', formData)
        .then(response => {
          console.log(response.data);
          setLoading(false);
          Alert.alert('Report Submitted!', 'Your report has been submitted!');
          navigation.goBack();
        })
        .catch(e => {
          console.log(e.response);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.headerContainer}>
        <Title style={styles.title}>
          Submit a{' '}
          <Title style={{color: '#FD7644', fontSize: 30}}>Report</Title>
        </Title>
        <Paragraph style={styles.paragraph}>
          We're sad to hear that you encountered a problem. Please describe your
          problem so that we can help you.
        </Paragraph>
      </View>

      <Modal transparent={true} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color="blue" />
          </View>
        </View>
      </Modal>

      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Ticket Title"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          placeholder="Enter a suitable title for your ticket"
          activeOutlineColor="#808080"
          onChangeText={setTitle}
          right={<TextInput.Icon name="ticket-outline" color="#FD7644" />}
        />
        <TextInput
          mode="outlined"
          label="Ticket Description"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          activeOutlineColor="#808080"
          placeholder="Tell us what you've experienced"
          multiline={true}
          onChangeText={setDesc}
          numberOfLines={5}
          right={<TextInput.Icon name="ticket-outline" color="#FD7644" />}
        />
        <TouchableOpacity
          onPress={() => itemImage()}
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* {isImageSet ? (
            <View>
              <Image
                style={{height: 100, width: 100}}
                source={{uri: itemUri}}
              />
            </View>
          ) : (
            <View></View>
          )} */}
          <TextInput
            mode="flat"
            label="Choose Image..."
            style={styles.inputImage}
            selectionColor="black"
            outlineColor="#808080"
            activeOutlineColor="#808080"
            disabled={true}
            value={itemUri}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => submitReport()}>
          <Text style={{color: '#FFF', fontSize: 18}}>Submit Report</Text>
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
  headerContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
  },
  paragraph: {
    fontSize: 15,
    textAlign: 'center',
    color: '#888888',
  },

  formContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  input: {
    color: '#fff',
    width: '80%',
    backgroundColor: '#fff',
    marginVertical: 8,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FD7644',
    width: '80%',
    marginVertical: 30,
    borderRadius: 20,
    height: 50,
  },

  inputImage: {
    color: '#fff',
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderBottomWidth: 1,
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

export default Report;
