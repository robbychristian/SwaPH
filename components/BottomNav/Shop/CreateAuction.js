import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  Title,
  Button,
  Paragraph,
  TextInput,
  Subheading,
  Checkbox,
  Caption,
  Headline,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import {UserContext} from '../../../provider/UserProvider';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const CreateAuction = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const pickerRef = useRef();

  //TERMS MODAL
  const [viewTerms, setViewTerms] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // TEXTS
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [objectName, setObjectName] = useState('');
  const [objectDesc, setObjectDesc] = useState('');
  const [startBid, setStartBid] = useState(0);

  // ITEMS
  const [item, setItem] = useState();
  const [itemName, setItemName] = useState('');
  const [itemUri, setItemUri] = useState('');
  const [itemSize, setItemSize] = useState();

  // DATES
  const [startDate, setStartDate] = useState('');
  const [startVisible, setStartVisible] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [endVisible, setEndVisible] = useState(false);
  const showStartPicker = () => {
    setStartVisible(true);
  };
  const hideStartPicker = () => {
    setStartVisible(false);
  };
  const confirmStartDate = date => {
    setStartDate(moment(date).format('YYYY-MM-DD'));
    hideStartPicker();
  };
  const showEndPicker = () => {
    setEndVisible(true);
  };
  const hideEndPicker = () => {
    setEndVisible(false);
  };
  const confirmEndDate = date => {
    setEndDate(moment(date).format('YYYY-MM-DD'));
    hideEndPicker();
  };

  const open = () => {
    pickerRef.current.focus();
  };
  const close = () => {
    pickerRef.current.blur();
  };

  //PERMISSION REQUEST / IMAGE PICKER
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
        setItemUri(response.assets[0].uri);
        setItemName(response.assets[0].fileName);
        setItemSize(response.assets[0].fileSize);
        //console.log(response.assets[0].uri);
      }
    });
  };

  const continueSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userID', user.id);
    formData.append('startBid', startBid);
    formData.append('endDate', endDate);
    formData.append('itemname', objectName);
    formData.append('itemcategory', category);
    formData.append('itemdetails', objectDesc);

    axios({
      url: 'https://swapph.online/restapi/PostAuction',
      method: 'POST',
      data: formData,
    })
      .then(response => {
        console.log(response.data.PostID);
        const imageForm = new FormData();
        let image = {
          uri: itemUri,
          type: 'multipart/form-data',
          name: itemName,
        };
        imageForm.append('image', image);
        imageForm.append('supporting_id', response.data.PostID);
        imageForm.append('support_type', 'auction');
        axios
          .post('https://swapph.online/restapi/AddSupportingImage', imageForm)
          .then(response => {
            console.log(response.data);
            setLoading(false);
            Alert.alert(
              'Success!',
              'Your auction has now been added to the listings.',
            );
            navigation.navigate('HomeStack');
          })
          .catch(e => {
            console.log(e.response);
            setLoading(false);
            Alert.alert(
              'Upload Error!',
              'There was an error in uploading your file!',
            );
          });
      })
      .catch(e => {
        console.log(e.response);
        setLoading(false);
        Alert.alert(
          'Error!',
          'An unexpected error happened! Please make sure you have internet connection.',
        );
      });
  };

  // SUBMIT ACTION
  const submit = () => {
    if (
      title == '' ||
      description == '' ||
      category == '' ||
      objectName == '' ||
      objectDesc == '' ||
      startBid == 0 ||
      endDate == '' ||
      itemUri == ''
    ) {
      Alert.alert('Input Error!', 'Please fill in the fields that are empty.');
    } else if (
      moment().isAfter(moment(endDate)) ||
      moment().isSame(moment(endDate))
    ) {
      Alert.alert(
        'Date error!',
        'Please input a date after ' + moment().format('LL') + '!',
      );
    } else {
      setViewTerms(true);
    }
  };

  useEffect(() => {
    axios
      .get('https://swapph.online/restapi/GetCategories')
      .then(response => {
        setCategories(response.data.Data);
      })
      .catch(e => {
        console.log(e);
      });
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
              <Caption>
                Auctioneers are obliged to pay in advance when making a bid. If
                they are unsuccessful in their bid, they will get their money
                back. After the auction, the item must be awarded/shipped within
                three business days. If the item is not delivered within three
                days, the purchase is terminated, and the trader is refunded.
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
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <Button
                style={{marginTop: 10}}
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
      <ScrollView style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <Title style={styles.title}>
            Post an Item for{' '}
            <Title style={{fontSize: 25, color: '#EB805F'}}>Auction</Title>
          </Title>
          <Paragraph style={styles.description}>
            Fill all the necessary details and make sure you provide correct
            information
          </Paragraph>
        </View>

        <View style={styles.bodyContainer}>
          <Subheading style={{alignSelf: 'flex-start', paddingHorizontal: 25}}>
            Auction Details:{' '}
          </Subheading>
          <TextInput
            mode="outlined"
            label="Auction Title"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            activeOutlineColor="#808080"
            onChangeText={setTitle}
          />
          <TextInput
            mode="outlined"
            label="Auction Description"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            multiline={true}
            numberOfLines={4}
            activeOutlineColor="#808080"
            onChangeText={setDescription}
          />
          <TextInput
            mode="outlined"
            label="Starting Bid"
            placeholder="PHP: 0.00"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            activeOutlineColor="#808080"
            onChangeText={setStartBid}
            keyboardType="number-pad"
          />
          <Subheading style={{alignSelf: 'flex-start', paddingHorizontal: 25}}>
            Item Details:{' '}
          </Subheading>
          <TextInput
            mode="outlined"
            label="Item Name"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            activeOutlineColor="#808080"
            onChangeText={setObjectName}
          />
          <TextInput
            mode="outlined"
            label="Item Details"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            activeOutlineColor="#808080"
            multiline={true}
            numberOfLines={4}
            onChangeText={setObjectDesc}
          />
          <TouchableOpacity
            style={styles.regionContainer}
            onPress={() => {
              open();
            }}>
            <TextInput
              mode="outlined"
              label="Category"
              style={styles.input}
              selectionColor="black"
              value={category}
              outlineColor="#808080"
              activeOutlineColor="#808080"
              editable={false}
            />
          </TouchableOpacity>
          <Subheading style={{alignSelf: 'flex-start', paddingHorizontal: 25}}>
            Auction Dates:{' '}
          </Subheading>

          {/* END DATE */}
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => {
              showEndPicker();
            }}>
            <TextInput
              mode="outlined"
              label="End Date"
              style={styles.input}
              selectionColor="black"
              outlineColor="#808080"
              activeOutlineColor="#808080"
              editable={false}
              right={<TextInput.Icon name="calendar" />}
              onChangeText={setEndDate}
              value={endDate.toString()}
            />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={endVisible}
            mode="date"
            onConfirm={confirmEndDate}
            onCancel={hideEndPicker}
          />
          {/* END DATE */}

          {/* START IMAGE PICKER */}
          <TouchableOpacity
            onPress={() => itemImage()}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
          {/* END IMAGE PICKER */}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => submit()}>
          <Text style={{color: '#FFF'}}>Post Auction</Text>
        </TouchableOpacity>

        <Picker
          ref={pickerRef}
          style={{opacity: 0, height: 0}}
          mode="dialog"
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
          {categories.map((buttonInfo, id) => {
            return (
              <Picker.Item label={buttonInfo.Category} value={buttonInfo.ID} />
            );
          })}
        </Picker>
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
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },

  title: {
    fontSize: 25,
  },
  description: {
    color: '#808080',
    textAlign: 'center',
    paddingHorizontal: 30,
  },

  bodyContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    color: '#fff',
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    width: '100%',
    backgroundColor: '#fff',
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
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  regionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    width: '100%',
    backgroundColor: '#fff',
  },

  termsWrapper: {
    backgroundColor: '#FFFFFF',
    width: '75%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

export default CreateAuction;
