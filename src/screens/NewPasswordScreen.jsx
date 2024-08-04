import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const NewPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleConfirm = () => {
    console.log('New password:', newPassword);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#ccc"
        />
      </View>
      <Button title="Confirm" onPress={handleConfirm} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fondo negro
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
    color: '#fff', // Texto blanco
  },
});

export default NewPasswordScreen;