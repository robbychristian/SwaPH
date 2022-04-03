import React, {useState, useRef, useEffect, useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
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
import {TextInput, Button, ProgressBar, HelperText} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RegisterContext} from '../../provider/RegisterProvider';
import moment from 'moment';

const Register2 = () => {
  const navigation = useNavigation();
  //FOR USE CONTEXT (REGISTER)
  const register = useContext(RegisterContext);

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [contactNo, setContactNo] = useState('');
  //setting calendar modal
  const [isVisible, setIsVisible] = useState(false);
  const showDatePicker = () => {
    setIsVisible(true);
  };
  const hideDatePicker = () => {
    setIsVisible(false);
  };
  const confirmBirthday = date => {
    setBirthday(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  useEffect(() => {
    console.log(register.email);
    console.log(register.password);
  }, []);

  //submit button
  const submit = () => {
    if (fname == '' || lname == '' || birthday == '' || contactNo == '') {
      Alert.alert(
        'Some inputs are empty!',
        'Please fill in the fields that are empty.',
      );
    } else if (contactNo.length > 12 || contactNo.length < 11) {
      Alert.alert(
        'Error Contact Number!',
        'Contact Number should at least be 11 numbers only.',
      );
    } else {
      register.fname = fname;
      register.lname = lname;
      register.birthday = birthday;
      register.contactNumber = contactNo;
      navigation.navigate('ThirdRegister');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ProgressBar progress={0.4} color="#ff0000" />
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
          Complete Your <Text style={{color: '#EB805F'}}>Profile</Text>
        </Text>
        <Text style={styles.description}>
          Complete your details and make sure
        </Text>
        <Text style={styles.description}>to provide correct information</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="First Name"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          activeOutlineColor="#808080"
          onChangeText={setFname}
        />
        <TextInput
          mode="outlined"
          label="Last Name"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          activeOutlineColor="#808080"
          onChangeText={setLname}
        />
        {/*==================DATE PICKER==================*/}
        <TouchableOpacity
          style={styles.birthdayContainer}
          onPress={() => {
            showDatePicker();
          }}>
          <TextInput
            mode="outlined"
            label="Birthday"
            style={styles.input}
            selectionColor="black"
            outlineColor="#808080"
            activeOutlineColor="#808080"
            editable={false}
            right={<TextInput.Icon name="calendar" />}
            onChangeText={setBirthday}
            value={birthday.toString()}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isVisible}
          mode="date"
          onConfirm={confirmBirthday}
          onCancel={hideDatePicker}
        />
        {/*==================DATE PICKER==================*/}

        <TextInput
          mode="outlined"
          label="Contact Number"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          placeholder="09123456789"
          keyboardType="number-pad"
          activeOutlineColor="#808080"
          right={<TextInput.Icon name="phone" />}
          onChangeText={setContactNo}
        />
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={{color: '#fff'}}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    flex: 0.4,
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
  },

  formContainer: {
    flex: 1,
    marginBottom: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  birthdayContainer: {
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

export default Register2;
