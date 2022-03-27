import React, {useState, useRef, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput, Button, ProgressBar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {RegisterContext} from '../../provider/RegisterProvider';
import moment from 'moment';
import axios from 'axios';

const Register3 = () => {
  const [street, setStreet] = useState('');
  const [barangay, setBarangay] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [region, setRegion] = useState('');

  const [availableRegions, setAvailableRegions] = useState([]);

  const pickerVisibility = useState(false);
  //setting calendar modal
  const pickerRef = useRef();
  const register = useContext(RegisterContext);
  const navigation = useNavigation();
  const open = () => {
    pickerRef.current.focus();
  };
  const close = () => {
    pickerRef.current.blur();
  };

  useEffect(() => {
    axios
      .get('http://10.0.2.2/SwapPH/restapi/getAllRegions/')
      .then(response => {
        setAvailableRegions(response.data.Data);
        console.log(response.data.Data);
      });
  }, []);

  const submit = () => {
    if (
      street == '' ||
      barangay == '' ||
      city == '' ||
      zipCode == '' ||
      region == ''
    ) {
      Alert.alert(
        'Some inputs are empty!',
        'Please fill in the fields that are empty.',
      );
    } else {
      register.street = street;
      register.barangay = barangay;
      register.city = city;
      register.zip = zipCode;
      register.region = region;
      navigation.navigate('FourthRegister');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ProgressBar progress={0.6} color="#ff0000" />
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
          Address <Text style={{color: '#EB805F'}}>Information</Text>
        </Text>
        <Text style={styles.description}>
          Complete your details and make sure
        </Text>
        <Text style={styles.description}>to provide correct information</Text>
      </View>

      <ScrollView style={{width: '100%', flex: 1}}>
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Street"
            style={styles.input}
            placeholder="25A, Street St."
            selectionColor="black"
            outlineColor="#808080"
            activeOutlineColor="#808080"
            right={<TextInput.Icon name="home" />}
            onChangeText={setStreet}
          />
          <TextInput
            mode="outlined"
            label="Barangay"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            placeholder="Barangay Brgy"
            activeOutlineColor="#808080"
            right={<TextInput.Icon name="home-floor-b" />}
            onChangeText={setBarangay}
          />

          {/* TRIGGER HERE FOR REGION*/}
          <TouchableOpacity
            style={styles.regionContainer}
            onPress={() => {
              open();
            }}>
            <TextInput
              mode="outlined"
              label="Region"
              style={styles.input}
              selectionColor="black"
              value={region}
              outlineColor="#808080"
              activeOutlineColor="#808080"
              editable={false}
              right={<TextInput.Icon name="calendar" />}
              onChangeText={setRegion}
            />
          </TouchableOpacity>

          <TextInput
            mode="outlined"
            label="City"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            placeholder="Quezon City"
            activeOutlineColor="#808080"
            right={<TextInput.Icon name="home-city" />}
            onChangeText={setCity}
          />
          <TextInput
            mode="outlined"
            label="Zip Code"
            style={styles.input}
            keyboardType="number-pad"
            selectionColor="black"
            outlineColor="#808080"
            placeholder="1109"
            activeOutlineColor="#808080"
            right={<TextInput.Icon name="home-map-marker" />}
            onChangeText={setZipCode}
          />
          {/* HIDE THE FIELD */}
          <Picker
            ref={pickerRef}
            style={{opacity: 0, height: 0}}
            mode="dialog"
            selectedValue={region}
            onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}>
            {availableRegions.map((buttonInfo, id) => {
              return (
                <Picker.Item
                  label={buttonInfo.Region}
                  value={buttonInfo.Region}
                />
              );
            })}
          </Picker>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={{color: '#fff'}}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    flex: 0.2,
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

  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  regionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    width: '100%',
    backgroundColor: '#fff',
  },

  input: {
    color: '#fff',
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 15,
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

export default Register3;
