import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../provider/UserProvider';
import axios from 'axios';

function Login() {
  const [text, setText] = useState('');
  const [show, setShow] = useState(true);
  const [btnClass, setBtnClass] = useState(styles.button);
  const user = useContext(UserContext);
  //form
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // useEffect(() => {
  //   console.log(email);
  //   console.log(pass);
  // }, []);

  const submit = () => {
    if (email == '' || pass == '') {
      Alert.alert('Invalid Input!', 'Please input your email and password!');
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', pass);
      axios
        .post('https://swapph.online/restapi/Login', formData)
        .then(response => {
          user.id = response.data.data[0].ID;
          user.barangay = response.data.data[0].Barangay;
          user.birthday = response.data.data[0].Birthday;
          user.city = response.data.data[0].City;
          user.contactNumber = response.data.data[0].ContactNumber;
          user.email = response.data.data[0].Email;
          user.fname = response.data.data[0].Fname;
          user.lastUpdateDate = response.data.data[0].LastUpdateDate;
          user.lastUpdatedId = response.data.data[0].LastUpdateID;
          user.lastUpdatedUserType = response.data.data[0].LastUpdatedUserType;
          user.lname = response.data.data[0].Lname;
          user.password = response.data.data[0].Password;
          user.photoWithIdLink = response.data.data[0].PhotoWithIdLink;
          user.profilePicture = response.data.data[0].ProfilePicture;
          user.region = response.data.data[0].Region;
          user.street = response.data.data[0].Street;
          user.userType = response.data.data[0].UserType;
          user.username = response.data.data[0].Username;
          user.validIdLink = response.data.data[0].ValidIDLink;
          user.validatedBy = response.data.data[0].ValidatedBy;
          user.validatedByUserType = response.data.data[0].ValidatedByUserType;
          user.zip = response.data.data[0].Zip;
          user.isDeactivated = response.data.data[0].isDeactivated;
          user.isDeactivatedById = response.data.data[0].isDeactivatedByID;
          user.isValidated = response.data.data[0].isValidated;
          console.log('no errors');
          setLoading(false);
        })
        .then(() => {
          navigation.navigate('HomeStack');
        })
        .catch(e => {
          Alert.alert(
            'Invalid Credentials!',
            'Please input your correct email and password!',
          );
          setLoading(false);
          console.log(e);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={50}>
      <Modal transparent={true} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color="blue" />
          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.description}>
          Sign in with your email and password.
        </Text>
        <Text style={styles.description}>Make sure both of them match</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          style={styles.emailInput}
          selectionColor="black"
          outlineColor="#808080"
          placeholder="Enter your email"
          activeOutlineColor="#808080"
          keyboardType="email-address"
          right={<TextInput.Icon name="email" />}
          onChangeText={setEmail}
        />
        <TextInput
          mode="outlined"
          placeholderTextColor="#fff"
          selectionColor="white"
          label="Password"
          style={styles.passInput}
          outlineColor="#808080"
          placeholder="Enter your password"
          activeOutlineColor="#808080"
          secureTextEntry={show}
          right={
            <TextInput.Icon
              name="eye"
              onPress={() => {
                if (show) {
                  setShow(false);
                } else {
                  setShow(true);
                }
              }}
            />
          }
          onChangeText={setPass}
        />
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={{color: '#fff'}}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('Register')}>
            <Text style={{color: '#FD7644'}}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    flex: 0.65,
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

  emailInput: {
    color: '#fff',
    width: '80%',
    backgroundColor: '#fff',
  },
  passInput: {
    width: '80%',
    color: '#fff',
    marginTop: 20,
    backgroundColor: '#fff',
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
  registerContainer: {
    flexDirection: 'row',
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

export default Login;
