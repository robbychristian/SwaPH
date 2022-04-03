import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import {
  Paragraph,
  Title,
  Button,
  TextInput,
  Checkbox,
  Caption,
  Subheading,
} from 'react-native-paper';
import {UserContext} from '../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const CreateLiveStream = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [item, setItem] = useState();
  const [itemName, setItemName] = useState('');
  const [itemUri, setItemUri] = useState('');
  const [itemSize, setItemSize] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isImageSet, setIsImageSet] = useState(false);

  //TERMS AND CONDITION
  const [viewTerms, setViewTerms] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

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
        setIsImageSet(true);
        setItemUri(response.assets[0].uri);
        setItemName(response.assets[0].fileName);
        setItemSize(response.assets[0].fileSize);
        //console.log(response.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const continueSubmit = () => {
    const formData = new FormData();
    let thumbnail = {
      uri: itemUri,
      type: 'multipart/form-data',
      name: itemName,
    };
    formData.append('Thumbnail', thumbnail);
    formData.append('Title', title);
    formData.append('description', description);
    formData.append('user_id', user.id);
    axios({
      url: 'https://swapph.online/restapi/PostLive',
      method: 'POST',
      data: formData,
      //headers: {
      //  Accept: 'multipart/form-data',
      //  'Content-Type': 'multipart/form-data',
      //},
    })
      .then(response => {
        console.log(response.data);
        const JWTForm = new FormData();
        JWTForm.append('user_id', user.id);
        axios
          .post('https://swapph.online/restapi/GenerateBroadcastJWT', JWTForm)
          .then(response => {
            console.log(response.data.data.jwt_token);
            console.log(response.data.data.liveid);
            console.log(response.data.data.room_key);
            navigation.navigate('LiveStream', {
              roomKey: response.data.data.room_key,
              jwtToken: response.data.data.jwt_token,
              liveId: response.data.data.liveid,
              isHost: true,
            });
          });
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  const submit = () => {
    if (title == '' || description == '' || itemUri == '') {
      Alert.alert('Input Error!', 'Please fill in the fields that are empty.');
    } else {
      setViewTerms(true);
    }
  };

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
      {/* TERMS AND CONDITION START */}
      <Modal transparent={true} visible={viewTerms}>
        <View style={styles.modalBackground}>
          <View style={styles.termsWrapper}>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Button
                icon="close"
                labelStyle={{
                  fontSize: 15,
                  height: 1,
                  fontWeight: 'bold',
                  marginRight: -10,
                }}
                color="#000"
                mode="text"
                onPress={() => setViewTerms(false)}
              />
            </View>
            <Title style={{textAlign: 'center', marginTop: -10}}>
              Terms and Conditions
            </Title>
            <View style={styles.termsContainer}>
              <Subheading style={{fontWeight: 'bold'}}>
                POLICIES IN LIVE SELLING:
              </Subheading>
              <Caption>
                Sellers are not permitted to display harmful or improper
                material while utilizing live selling. The use of rude or
                profane language is strictly prohibited. The sellers are
                entirely responsible for their account and password security,
                limiting access to their computer, and any actions that occur
                under their account or password. The sellers should ensure that
                the information they give to SwaPH at registration and other
                times is accurate, complete, and current to the best of their
                knowledge. The admin reserves the right to deactivate the
                seller's account at any time, including if they breach any of
                these conditions or if actions on their account infringe or
                violate other parties' rights or violate any relevant laws or
                regulations.
              </Caption>
              <View style={styles.checkboxField}>
                <Checkbox
                  status={agreeTerms ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setAgreeTerms(!agreeTerms);
                  }}
                />
                <Subheading style={{fontSize: 13, fontWeight: 'bold'}}>
                  I agree with the terms and conditions
                </Subheading>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Button
                style={{marginTop: 10, alignSelf: 'center'}}
                mode="contained"
                color="blue"
                disabled={!agreeTerms}
                onPress={() => continueSubmit()}>
                <Text style={{color: '#FFF'}}>Submit</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      {/* TERMS AND CONDITION END */}
      <View style={styles.headerContainer}>
        <Title style={styles.title}>
          Start Live{' '}
          <Title style={{fontSize: 30, color: '#EB805F', fontWeight: '600'}}>
            Streaming
          </Title>
        </Title>
        <Paragraph style={styles.description}>
          Fill in the form and add an image for the item you are selling
        </Paragraph>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          mode="outlined"
          label="Title"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          activeOutlineColor="#808080"
          onChangeText={setTitle}
        />
        <TextInput
          mode="outlined"
          label="Description"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          activeOutlineColor="#808080"
          multiline={true}
          numberOfLines={5}
          onChangeText={setDescription}
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
        <TouchableOpacity style={styles.button} onPress={() => submit()}>
          <Text style={{color: '#FFF'}}>Start Live</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  headerContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    color: '#000',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#808080',
    paddingHorizontal: 30,
    textAlign: 'center',
  },

  contentContainer: {
    flex: 0.75,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    color: '#fff',
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  inputImage: {
    color: '#fff',
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderBottomWidth: 1,
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
  termsWrapper: {
    backgroundColor: '#FFFFFF',
    width: '75%',
    borderRadius: 10,
    display: 'flex',
    paddingVertical: 20,
  },
  termsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  checkboxField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateLiveStream;
