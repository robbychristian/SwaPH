import React from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';

const MyAccount = () => {
  return (
    <SafeAreaView>
      <Text>My account</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MyAccount;
