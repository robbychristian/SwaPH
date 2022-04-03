import React, {useState, useContext, useEffect} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native'; //react native components
import {ProgressBar, Button, Caption} from 'react-native-paper'; //react native paper components
import {useNavigation} from '@react-navigation/native'; //react navigation
import {RegisterContext} from '../../provider/RegisterProvider';
import axios from 'axios';

const Register5 = () => {
  const navigation = useNavigation();
  const register = useContext(RegisterContext);
  const [isImageSet, setIsImageSet] = useState(false);
  const [loading, setLoading] = useState(false);
  //for VALID ID
  const [id, setId] = useState();
  const [idUri, setIdUri] = useState();
  const [idName, setIdName] = useState();

  const requestCameraPermission = () => {
    try {
      console.log('mounted');
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permission to Access Camera',
          message: 'Allow SwaPH to access the camera to take pictures',
          buttonPositive: 'OK',
          buttonNegative: 'No',
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = () => {
    setLoading(true);
    let validID = {
      uri: register.idUrl,
      type: 'multipart/form-data',
      name: register.idName,
    };
    let photoWithId = {
      uri: register.photoIdUrl,
      type: 'multipart/form-data',
      name: register.photoIdName,
    };
    const formData = new FormData();
    formData.append('fname', register.fname);
    formData.append('lname', register.lname);
    formData.append('bday', register.birthday);
    formData.append('street', register.street);
    formData.append('brgy', register.barangay);
    formData.append('city', register.city);
    formData.append('region', register.region);
    formData.append('zip', register.zip);
    formData.append('email', register.email);
    formData.append('contact', register.contactNumber);
    formData.append('pass', register.password);
    formData.append('brgy', register.barangay);
    formData.append('valid_id', validID);
    formData.append('photo_with_id', photoWithId);
    formData.append('usertype', 1);

    axios
      .post('https://swapph.online/restapi/RegisterTrader', formData)
      .then(response => {
        console.log(response.data);
        setLoading(false);
        Alert.alert(
          'Successfully Registered!',
          'Your account has been added! Wait for 2 to 3 days before being verified by the admin.',
        );
        navigation.navigate('LoginStack');
      })
      .catch(e => {
        console.log(e.response);
        setLoading(false);
        Alert.alert('Error!', 'There was an error handling your request.');
      });
  };

  useEffect(() => {
    console.log(PermissionsAndroid.check.CAMERA);
    requestCameraPermission();
    // console.log(register.idUrl);
    // console.log(register.idName);
    // console.log(register.photoIdUrl);
    // console.log(register.photoIdName);
    console.log(register.contactNumber);
  }, [id]);

  const validID = () => {
    const options = {
      storageOptions: {
        saveToPhotos: true,
        mediaType: 'photo',
        path: 'images',
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled uploading Valid ID');
      } else if (response.error) {
        console.log('error uploading: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        register.photoId = response;
        register.photoIdUrl = response.assets[0].uri;
        register.photoIdName = response.assets[0].fileName;
        setId(response);
        setIsImageSet(true);
        setIdUri(response.assets[0].uri);
        setIdName(response.assets[0].fileName);
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color="blue" />
          </View>
        </View>
      </Modal>
      <ProgressBar progress={1} color="#ff0000" />
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
        <Text style={styles.title}>
          Upload Your <Text style={{color: '#EB805F'}}>Selfie</Text> with ID
        </Text>
        <Text style={styles.description}>
          To help us verify details that you provided
        </Text>
        <Text style={styles.description}>are correct information</Text>
      </View>
      <TouchableOpacity style={styles.imageContainer} onPress={validID}>
        {isImageSet ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: idUri}}
              style={{height: '100%', width: '100%', borderRadius: 50}}></Image>
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Caption>Click Here to add an image</Caption>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
        <Text style={{color: '#fff'}}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 27,
    color: '#000',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#808080',
  },
  imageContainer: {
    flex: 0.8,
    borderWidth: 1,
    borderColor: '#EB805F',
    marginHorizontal: 10,
    borderRadius: 50,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },

  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FD7644',
    width: '80%',
    marginVertical: 30,
    borderRadius: 20,
    height: 50,
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

export default Register5;
