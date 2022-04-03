import React, {useState, useEffect, useContext} from 'react';
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
} from 'react-native'; //react native components
import {
  ProgressBar,
  Button,
  Caption,
  Dialog,
  Paragraph,
} from 'react-native-paper'; //react native paper components
import {useNavigation} from '@react-navigation/native'; //react navigation
import {RegisterContext} from '../../provider/RegisterProvider';

const Register4 = () => {
  const navigation = useNavigation();
  const register = useContext(RegisterContext);
  const [isImageSet, setIsImageSet] = useState(false);

  //for dialog
  const [isVisible, setIsVisible] = useState(true);
  const hideDialog = () => {
    setIsVisible(false);
  };

  //for VALID ID
  const [id, setId] = useState();
  const [idUri, setIdUri] = useState();
  const [idName, setIdName] = useState();

  const submit = () => {
    if (id == undefined) {
      Alert.alert('Error!', 'Please submit a photo of your ID');
    } else {
      navigation.navigate('FifthRegister');
    }
  };

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

  useEffect(() => {
    requestCameraPermission();
    console.log('updated:' + JSON.stringify(id));

    console.log(register.idUrl);
    console.log(register.idName);
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
        register.id = response;
        register.idUrl = response.assets[0].uri;
        register.idName = response.assets[0].fileName;
        setId(response);
        setIsImageSet(true);
        setIdUri(response.assets[0].uri);
        setIdName(response.assets[0].fileName);
        //console.log(response.assets[0].uri);
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar progress={0.8} color="#ff0000" />
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
          Upload Your <Text style={{color: '#EB805F'}}>ID</Text>
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
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={{color: '#fff'}}>Continue</Text>
      </TouchableOpacity>

      {isVisible ? (
        <Dialog visible={isVisible} onDismiss={hideDialog}>
          <Dialog.Title>Almost Done!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              We just need to validate the information you have provided by
              submitting your{' '}
              <Paragraph style={{color: '#EB805F'}}>ID</Paragraph> and your
              <Paragraph style={{color: '#EB805F'}}> Selfie</Paragraph>!
            </Paragraph>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog>
      ) : (
        <View></View>
      )}
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
    fontSize: 30,
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
});

export default Register4;
