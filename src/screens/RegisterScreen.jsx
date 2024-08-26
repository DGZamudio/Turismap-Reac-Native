import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Video } from 'expo-av';
import { CommonActions } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

const RegisterScreen = ({ navigation }) => {
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

  const [nombreUsuario, setNombreUsuario] = useState("")
  const [correoUsuario, setCorreoUsuario] = useState("")
  const [contrasenaUsuario, setContrasenaUsuario] = useState("")
  const [contrasenaUsuario2, setContrasenaUsuario2] = useState("")

  const [showAlert, setShowAlert] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const sinCaracteresEspeciales = /^[a-zA-Z0-9]*$/;
  const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
        console.log(e)
    }
  };

  const insertData = () => {
    setShowLoadingAlert(true)
    if (contrasenaUsuario != '') {
        if (nombreUsuario != '') {
            if (correoUsuario != '') {
                if (contrasenaUsuario == contrasenaUsuario2 ) {
                    if (contrasenaUsuario.length >= 8) {
                        if (sinCaracteresEspeciales.test(nombreUsuario)) {
                            if (regexCorreo.test(correoUsuario)) {
                                fetch('https://turismap-backend-python.onrender.com/register', {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({nombreUsuario:nombreUsuario,correoUsuario:correoUsuario,contrasenaUsuario:contrasenaUsuario,estadoUsuario:'1',rolUsuario:'1'})
                                  })
                                  .then(resp => resp.json())
                                  .then(data => {
                                    if (data.mensaje === 'Este usuario ya existe') {
                                        setShowLoadingAlert(false)
                                        setErrorMessage('This email is taken')
                                        setShowErrorAlert(true)
                                    }
                                    else {
                                        if (data.access_token) {
                                            setShowLoadingAlert(false)
                                            setAlertMessage('User was added succesfully')
                                            storeData(data.access_token)
                                            setShowAlert(true)
                                            navigation.dispatch(
                                                CommonActions.reset({
                                                    index: 0,
                                                    routes: [{ name: 'Home' }],
                                                })
                                            );
                                          } else {
                                            setShowLoadingAlert(false)
                                            setErrorMessage('Register failed try again');
                                            setShowErrorAlert(true);
                                          }
                                    }
                                  })
                                  .catch(error => {
                                      setShowLoadingAlert(false)
                                      setErrorMessage('There was an error creating the user')
                                      setShowErrorAlert(true)
                                      console.log(error)
                                  })
                            }
                            else {
                                setShowLoadingAlert(false)
                                setErrorMessage('The email is not valid')
                                setShowErrorAlert(true)
                            }
                        }
                        else {
                            setShowLoadingAlert(false)
                            setErrorMessage('The username cant have special characters')
                            setShowErrorAlert(true)
                        }
                    }
                    else {
                        setShowLoadingAlert(false)
                        setErrorMessage('The password has to be 8 or more characters long')
                        setShowErrorAlert(true)
                    }
                }
                else {
                    setShowLoadingAlert(false)
                    setErrorMessage('The passwords arent the same')
                    setShowErrorAlert(true)
                }
            }
            else {
                setShowLoadingAlert(false)
                setErrorMessage('The email cant be empty')
                setShowErrorAlert(true)
            }
        }
        else {
            setShowLoadingAlert(false)
            setErrorMessage('The username cant be empty')
            setShowErrorAlert(true)
        }
    } 
    else {
        setShowLoadingAlert(false)
        setErrorMessage('The password cant be empty')
        setShowErrorAlert(true)
    }
  }

  return (
      <ScrollView contentContainerStyle={styles.container}>
          <Video
              source={{uri: 'https://www.dropbox.com/scl/fi/ftmbd9ukbng2txtiilwhd/background.mp4?rlkey=81y4h7vwk7fprh35m9ia9c6jk&st=jx8rmazt&raw=1'}}
              style={styles.backgroundVideo}
              isMuted={true}
              isLooping
              shouldPlay
              resizeMode="cover"
          />
          <View style={styles.card}>
              <Text style={styles.title}>Turismap</Text>
              <Image source={require('../../assets/Turismap Logo Minimalist.png')} style={styles.logo} />
              <TextInput placeholder="Username" style={styles.input} placeholderTextColor="#f8f9fa" value={nombreUsuario} onChangeText = {text => setNombreUsuario(text)}/>
              <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" placeholderTextColor="#f8f9fa" value={correoUsuario} onChangeText = {text => setCorreoUsuario(text)}/>
              <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} placeholderTextColor="#f8f9fa" value={contrasenaUsuario} onChangeText = {text => setContrasenaUsuario(text)}/>
              <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry={true} placeholderTextColor="#f8f9fa" onChangeText = {text => setContrasenaUsuario2(text)}/>
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
              <Pressable onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
                    <Text style={styles.loginText}>Sign in</Text>
                </Pressable>
          </View>
          <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Success"
              message={alertMessage}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="#00bb00"
              onConfirmPressed={() => setShowAlert(false)}
            />
            <AwesomeAlert
              show={showErrorAlert}
              showProgress={false}
              title="Error"
              message={errorMessage}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="#e23636"
              onConfirmPressed={() => setShowErrorAlert(false)}
            />
            <AwesomeAlert
              show={showLoadingAlert}
              showProgress={false}
              title="Loading ..."
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={true}
              showCancelButton={false}
              showConfirmButton={false}
            />
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
      backgroundColor: '#343a4011',
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

export default RegisterScreen