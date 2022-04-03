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
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  ProgressBar,
  Colors,
  HelperText,
  Dialog,
} from 'react-native-paper';
import {RegisterContext} from '../../provider/RegisterProvider';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setCpass] = useState('');
  const [cpass, setPass] = useState('');
  const [isEmailMounted, setIsEmailMounted] = useState();
  const navigation = useNavigation();
  //FOR USE CONTEXT (REGISTER)
  const register = useContext(RegisterContext);

  const onChangeEmail = email => setEmail(email);

  const emailError = () => {
    return !email.includes('@gmail.com');
  };

  useEffect(() => {
    setIsEmailMounted(true);
    if (email != '') return setIsEmailMounted(false);
  }, [email]);

  const submit = () => {
    if (email == '' || pass == '' || cpass == '') {
      Alert.alert(
        'Some inputs are empty!',
        'Please fill in the fields that are empty.',
      );
    } else if (cpass != pass) {
      Alert.alert('Password Mismatch', 'The passwords does not match!');
    } else {
      register.email = email;
      register.password = pass;
      navigation.navigate('SecondRegister');
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ProgressBar progress={0.2} color="#ff0000" />
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
          Join <Text style={{color: '#EB805F'}}>SwaPH</Text> Today!
        </Text>
        <Text style={styles.description}>
          Complete your details and make sure
        </Text>
        <Text style={styles.description}>to provide correct information</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          activeOutlineColor="#808080"
          keyboardType="email-address"
          right={<TextInput.Icon name="email" />}
          onChangeText={onChangeEmail}
          value={email}
        />
        {isEmailMounted ? (
          <HelperText type="error" visible={false} style={{width: '80%'}}>
            Email address invalid
          </HelperText>
        ) : (
          <HelperText
            type="error"
            visible={emailError()}
            style={{width: '80%'}}>
            Email address invalid
          </HelperText>
        )}
        <TextInput
          mode="outlined"
          label="Password"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          activeOutlineColor="#808080"
          right={<TextInput.Icon name="key" />}
          onChangeText={setPass}
          secureTextEntry={true}
        />
        <HelperText type="error" visible={false} style={{width: '80%'}}>
          Password Invalid
        </HelperText>
        <TextInput
          mode="outlined"
          label="Confirm Password"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          activeOutlineColor="#808080"
          right={<TextInput.Icon name="key-plus" />}
          onChangeText={setCpass}
          secureTextEntry={true}
        />
        <HelperText type="error" visible={false} style={{width: '80%'}}>
          Confirm Password invalid
        </HelperText>

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
    marginBottom: 10,
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

  input: {
    color: '#fff',
    width: '80%',
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
});

export default Register;
