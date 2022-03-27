import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Paragraph, Title, TextInput} from 'react-native-paper';

const Report = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Title style={styles.title}>
          Submit a{' '}
          <Title style={{color: '#FD7644', fontSize: 30}}>Report</Title>
        </Title>
        <Paragraph style={styles.paragraph}>
          We're sad to hear that you encountered a problem. Please describe your
          problem so that we can help you.
        </Paragraph>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Ticket Title"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          placeholder="Enter a suitable title for your ticket"
          activeOutlineColor="#808080"
          right={<TextInput.Icon name="ticket-outline" color="#FD7644" />}
        />
        <TextInput
          mode="outlined"
          label="Ticket Description"
          style={styles.input}
          selectionColor="black"
          outlineColor="#808080"
          activeOutlineColor="#808080"
          placeholder="Tell us what you've experienced"
          multiline={true}
          numberOfLines={5}
          right={<TextInput.Icon name="ticket-outline" color="#FD7644" />}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={{color: '#FFF', fontSize: 18}}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
});

export default Report;
