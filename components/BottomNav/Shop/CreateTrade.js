import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
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
  Headline,
  Caption,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {UserContext} from '../../../provider/UserProvider';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const CreateTrade = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewTerms, setViewTerms] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const pickerRef = useRef();

  // FORM FIELDS
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [objectName, setObjectName] = useState('');
  const [objectDescription, setObjectDescription] = useState('');
  const [category, setCategory] = useState();

  // ITEMS
  const [item, setItem] = useState();
  const [itemName, setItemName] = useState('');
  const [itemUri, setItemUri] = useState('');
  const [itemSize, setItemSize] = useState();

  const open = () => {
    pickerRef.current.focus();
  };
  const close = () => {
    pickerRef.current.blur();
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
    formData.append('itemname', objectName);
    formData.append('itemcategory', category);
    formData.append('itemdetails', objectDescription);
    formData.append('userID', user.id);
    axios
      .post('https://swapph.online/restapi/PostBarter', formData)
      .then(response => {
        const imageForm = new FormData();
        let image = {
          uri: itemUri,
          type: 'multipart/form-data',
          name: itemName,
        };
        imageForm.append('image', image);
        imageForm.append('supporting_id', response.data.PostID);
        imageForm.append('support_type', 'barter');
        axios
          .post('https://swapph.online/restapi/AddSupportingImage', imageForm)
          .then(response => {
            console.log(response.data);
            setLoading(false);
            navigation.navigate('HomeStack');
          })
          .catch(e => {
            console.log(e.response);
            Alert.alert(
              'Upload Error!',
              'There was an error in uploading your file!',
            );
            setLoading(false);
          });
      })
      .catch(e => {
        console.log(e.response);
        Alert.alert(
          'Error!',
          'An unexpected error happened! Please make sure you have internet connection.',
        );
        setLoading(false);
      });
  };

  const submit = () => {
    if (
      title == '' ||
      description == '' ||
      objectName == '' ||
      objectDescription == '' ||
      category == '' ||
      itemUri == ''
    ) {
      Alert.alert('Input Error!', 'Please fill in the fields that are empty.');
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
          <View style={styles.formWrapper}>
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
                POLICIES IN TRADE:
              </Subheading>
              <Caption>
                Poisons, explosive precursors, ozone-depleting chemicals, and
                radioactive materials, as well as objects containing or emitting
                such substances, are usually banned on SwaPH. SwaPH will not be
                held liable for any agreement reached between the parties
                engaged in the transaction. It is the traders' duty to inspect
                the item during the exchange since SwaPH is not liable for the
                quality of the products or services provided by any of the
                parties. In order to complete a transaction, traders must have a
                valid account. Barter Systems reserves the right to suspend a
                Trader's account and/or terminate this agreement if one or more
                of the following conditions exists: Trader has committed fraud
                against either other clients or Barter Systems. Trader is not
                abiding by the terms of his/her contract with Barter Systems.
                Trader has acted in an unprofessional manner when dealing with
                Barter Systems staff or when trading with other Barter Systems
                clients.
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
            <Title style={{fontSize: 25, color: '#EB805F'}}>Trade</Title>
          </Title>
          <Paragraph style={styles.description}>
            Fill all the necessary details and make sure you provide correct
            information
          </Paragraph>
        </View>

        <View style={styles.bodyContainer}>
          <Subheading style={{alignSelf: 'flex-start', paddingHorizontal: 25}}>
            Trade Details:{' '}
          </Subheading>
          <TextInput
            mode="outlined"
            label="Trade Title"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            activeOutlineColor="#808080"
            onChangeText={setTitle}
          />
          <TextInput
            mode="outlined"
            label="Trade Description"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            multiline={true}
            placeholder="My item is..."
            numberOfLines={4}
            activeOutlineColor="#808080"
            onChangeText={setDescription}
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
            label="Item Description"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            multiline={true}
            placeholder="Size, color, weight, etc..."
            numberOfLines={4}
            activeOutlineColor="#808080"
            onChangeText={setObjectDescription}
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
                <Picker.Item
                  label={buttonInfo.Category}
                  value={buttonInfo.ID}
                />
              );
            })}
          </Picker>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  regionContainer: {
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
  formWrapper: {
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

export default CreateTrade;
