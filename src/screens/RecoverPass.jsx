import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Animated, StyleSheet, ScrollView } from 'react-native';
import { useAlert } from './Alert'; 
import { sendData } from './../services/api'

const RecoverPass = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [scaleAnim] = useState(new Animated.Value(1));
  const [underlineAnim] = useState(new Animated.Value(0));
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { showAlert } = useAlert();

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleCancel = () => {
    navigation.navigate('Login');
  };

  const handleFocus = () => {
    Animated.timing(underlineAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(underlineAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const underlineWidth = underlineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });


  const handleRecoverPassword = () => {
    showAlert('', 'loading')
    if (email === '' || email === ''){
      showAlert('Please fill all the blanks', 'error')
      return;
    }
    if (regexCorreo.test(email)) {
      sendData('/reset_contrasena', {correoUsuario:email})
      .then((data) => {
        if (data.error){
          showAlert(data.error, 'error');
          return;
        }
        if (data.message){
          showAlert(`A recovery email has been sent to: ${email}`, 'success', 'success');
          navigation.navigate('Login');
          return;
        }     
      })
      .catch((error) => {
        console.error(error);
        showAlert('Error sending email. Please try again later.', 'error');
      });
    }
    else {
      showAlert('Please enter a valid email address', 'error');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Turismap</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#f8f9fa"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Animated.View style={[styles.underline, { width: underlineWidth }]} />
        </View>

        <Pressable
          onPress={handleRecoverPassword}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.button}
        >
          <Animated.View style={[styles.buttonContent, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.buttonText}>Next</Text>
          </Animated.View>
        </Pressable>

        <Pressable onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  card: {
    backgroundColor: '#343a408a',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '100%',
    padding: 10,
    color: '#f8f9fa',
  },
  underline: {
    height: 2,
    backgroundColor: '#007bff',
    marginTop: -2,
  },
  button: {
    borderRadius: 30,
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 20,
  },
  cancelText: {
    color: '#f8f9fa',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default RecoverPass;