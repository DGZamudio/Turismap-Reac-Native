import React, {useContext, useState} from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Video } from 'expo-av';
import themeContext from '../theme/themeContext';
import { useAlert } from './Alert';

const AddUser = () => {
  const scaleAnim = new Animated.Value(1);
  const shadowAnim = new Animated.Value(0.2);

  const handlePressIn = () => {
      Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
      }).start();
      Animated.timing(shadowAnim, {
          toValue: 0.3,
          duration: 100,
          useNativeDriver: true,
      }).start();
  };

  const handlePressOut = () => {
      Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
      }).start();
      Animated.timing(shadowAnim, {
          toValue: 0.2,
          duration: 100,
          useNativeDriver: true,
      }).start();
  };

  const theme = useContext(themeContext)
  const [nombreUsuario, setNombreUsuario] = useState("")
  const [correoUsuario, setCorreoUsuario] = useState("")
  const [contrasenaUsuario, setContrasenaUsuario] = useState("")
  const [contrasenaUsuario2, setContrasenaUsuario2] = useState("")

  const { showAlert, hideAlert } = useAlert();
  const sinCaracteresEspeciales = /^[a-zA-Z0-9]*$/;
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const insertData = () => {
    showAlert('', 'loading')
    if (nombreUsuario === '' || correoUsuario === '' || contrasenaUsuario === '' || contrasenaUsuario2 === '') {
        showAlert('Please fill all the blanks', 'error')
    }
    else {
        if (contrasenaUsuario.length < 8) {
            showAlert('The password has to be 8 or more characters long', 'error')
        }
        else {
            if (contrasenaUsuario !== contrasenaUsuario2 ) {
                showAlert('The passwords arent the same', 'error')
            }
            else {
                if (!sinCaracteresEspeciales.test(nombreUsuario)) {
                    showAlert('The username cant have special characters', 'error')
                }
                else {
                    if (!regexCorreo.test(correoUsuario)) {
                        showAlert('The email is not valid', 'error')
                    }
                    else {
                        sendData('/register', {nombreUsuario:nombreUsuario,correoUsuario:correoUsuario,contrasenaUsuario:contrasenaUsuario,estadoUsuario:'1',rolUsuario:'1'})
                        .then(data => {
                            if (data.mensaje === 'Este usuario ya existe') {
                                showAlert('This email is taken', 'error')
                            }
                            else {
                                if (data.access_token) {
                                    showAlert('User was added succesfully', 'success')
                                    storeData(data.access_token)
                                    navigation.dispatch(
                                        CommonActions.reset({
                                            index: 0,
                                            routes: [{ name: 'Home' }],
                                        })
                                    );
                                  } else {
                                    showAlert('Register failed try again', 'error');
                                  }
                            }
                          })
                          .catch(error => {
                              showAlert('There was an error creating the user', 'error')
                              console.error(error)
                          })
                    }
                }
            }
        }
    }
  }

  return (
      <ScrollView contentContainerStyle={styles.container}>
          <Video
              source={{uri: theme.uri}}
              style={styles.backgroundVideo}
              isMuted={true}
              isLooping
              shouldPlay
              resizeMode="cover"
          />
          <View style={styles.card}>
              <Text style={styles.title}>Turismap</Text>
              <Image source={require('../../assets/Turismap Logo Minimalist.png')} style={styles.logo} />
              <TextInput placeholder="Username*" style={styles.input} placeholderTextColor="#f8f9fa" value={nombreUsuario} onChangeText = {text => setNombreUsuario(text)}/>
              <TextInput placeholder="Email*" style={styles.input} keyboardType="email-address" placeholderTextColor="#f8f9fa" value={correoUsuario} onChangeText = {text => setCorreoUsuario(text)}/>
              <TextInput placeholder="Password*" style={styles.input} secureTextEntry={true} placeholderTextColor="#f8f9fa" value={contrasenaUsuario} onChangeText = {text => setContrasenaUsuario(text)}/>
              <TextInput placeholder="Confirm Password*" style={styles.input} secureTextEntry={true} placeholderTextColor="#f8f9fa" onChangeText = {text => setContrasenaUsuario2(text)}/>
              <Text style={styles.passwordInfo}>
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
              </Text>
              <Pressable
                  onPress={() => insertData()}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  style={styles.button}
              >
                  <Animated.View
                      style={[
                          styles.buttonContent,
                          {
                              transform: [{ scale: scaleAnim }],
                              shadowOpacity: shadowAnim,
                          },
                      ]}
                  >
                      <Text style={styles.buttonText}>Create User</Text>
                  </Animated.View>
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
  backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
  },
  card: {
      backgroundColor: '#343a408a',
      padding: 20,
      borderRadius: 10,
      width: '90%',
      alignItems: 'center',
  },
  title: {
      fontSize: 24,
      marginBottom: 10,
      color: '#f8f9fa',
  },
  logo: {
      width: 100,
      height: 100,
      aspectRatio: 1,
      marginBottom: 20,
  },
  input: {
      backgroundColor: 'transparent',       
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
      borderRadius: 15,
      width: '100%',
      padding: 10,
      marginBottom: 10,
      color: '#f8f9fa',
  },
  passwordInfo: {
      color: '#f8f9fa',
      marginBottom: 10,
      textAlign: 'center',
  },
  button: {
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: '#fff',
  },
  buttonContent: {
      backgroundColor: 'transparent', 
      paddingVertical: 14,
      paddingHorizontal: 28,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      shadowOpacity: 0.2,
      elevation: 5,
  },
  buttonText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 18,
  },
  loginButton: {
      marginTop: 10,
  },
  loginText: {
      color: '#6c757d',
      fontSize: 16,
  },
});

export default AddUser