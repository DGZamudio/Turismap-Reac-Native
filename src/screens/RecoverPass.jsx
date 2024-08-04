import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text } from 'react-native';

const RecoverPass = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleRecoverPassword = () => {
    console.log('Recovering password for:', email);
    navigation.navigate('NewPasswordScreen');
  };

  const handleCancel = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ccc"
        />
      </View>
      <Button title="Next" onPress={handleRecoverPassword} />
      <Pressable onPress={handleCancel}>
        <Text style={styles.link}>Cancel</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
    color: '#fff',
  },
  link: {
    color: '#fff',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default RecoverPass;