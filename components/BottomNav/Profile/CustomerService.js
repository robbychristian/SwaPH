import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {TextInput, Title, Paragraph, Button} from 'react-native-paper';
import emailjs, {init} from '@emailjs/browser';
import {UserContext} from '../../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';

const CustomerService = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    // formData.append('service_id', 'service_q2ev2h9');
    // formData.append('template_id', 'template_gd852mz');
    // formData.append('user_id', 'ZL6nEuvK81i1YNPIn');
    // formData.append('template_params', {
    //   subject: subject,
    //   from_name: user.fname + ' ' + user.lname,
    //   message: body,
    // });
    formData.append('subject', subject);
    formData.append('from_name', user.fname + ' ' + user.lname);
    formData.append('message', body);

    let templateParams = {
      subject: subject,
      message: body,
      from_name: user.fname + ' ' + user.lname,
    };
    emailjs
      .send(
        'service_q2ev2h9',
        'template_gd852mz',
        templateParams,
        'ZL6nEuvK81i1YNPIn',
      )
      .then(response => {
        setLoading(false);
        console.log(response);
        Alert.alert(
          'Submitted!',
          'The team will contact you as soon as possible through email!',
        );
        navigation.goBack();
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
    //     axios
    //       .post('https://api.emailjs.com/api/v1.0/email/send-form/', formData)
    //       .then(response => {
    //         console.log(response);
    //         setLoading(false);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //         setLoading(false);
    //       });
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
          Contact <Title style={{color: '#FD7644', fontSize: 30}}>Us</Title>
        </Title>
        <Paragraph style={styles.paragraph}>
          Send us an email for suggestions, support, or assistance. Our team
          will contact you as soon as possible!
        </Paragraph>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Subject"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          placeholder="Email Subject..."
          activeOutlineColor="#808080"
          onChangeText={setSubject}
        />
        <TextInput
          mode="outlined"
          label="Body"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          placeholder="Email Body..."
          multiline={true}
          numberOfLines={5}
          activeOutlineColor="#808080"
          onChangeText={setBody}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => submit()}>
          <Text style={{color: '#FFF', fontSize: 18}}>Submit</Text>
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

export default CustomerService;
