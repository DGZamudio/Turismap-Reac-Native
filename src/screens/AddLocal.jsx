import React, {useContext, useState} from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Video } from 'expo-av';
import AwesomeAlert from 'react-native-awesome-alerts';
import themeContext from '../theme/themeContext';

const AddLocal = ({ navigation }) => {
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
  const [nombreLocal, setNombreLocal] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [altitud, setAltitud] = useState("")
  const [longitud, setLongitud] = useState("")
  const [horarios, setHorarios] = useState("")

  const [showAlert, setShowAlert] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const sinCaracteresEspeciales = /^[a-zA-Z0-9]*$/;

  const insertData = () => {
    setShowLoadingAlert(true)
    fetch('https://turismap-backend-python.onrender.com/new_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nombreSitiosTuristicos:nombreLocal,descripcionSitiosTuristicos:descripcion,altitudSitiosTuristicos:altitud,latitudSitiosTuristicos:longitud,horariosSitiosTuristicos:horarios, estadoSitiosTuristicos:"1"})
      })
      .then(resp => resp.json())
      .then(data => {
            setShowLoadingAlert(false)
            setAlertMessage('Local was added succesfully')
            setShowAlert(true)
      })
      .catch(error => {
          setShowLoadingAlert(false)
          setErrorMessage('There was an error creating the local')
          setShowErrorAlert(true)
          console.log(error)
      })
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
              <TextInput placeholder="Local name" style={styles.input} placeholderTextColor="#f8f9fa" value={nombreLocal} onChangeText = {text => setNombreLocal(text)}/>
              <TextInput placeholder="Description" style={styles.description} placeholderTextColor="#f8f9fa" value={descripcion} onChangeText = {text => setDescripcion(text)}/>
              <TextInput placeholder="Altitude" style={styles.input} placeholderTextColor="#f8f9fa" value={altitud} onChangeText = {text => setAltitud(text)}/>
              <TextInput placeholder="Longitude" style={styles.input} placeholderTextColor="#f8f9fa" value={longitud} onChangeText = {text => setLongitud(text)}/>
              <TextInput placeholder="Opens & closes at" style={styles.input} placeholderTextColor="#f8f9fa" value={horarios} onChangeText = {text => setHorarios(text)}/>
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
                      <Text style={styles.buttonText}>Create Local</Text>
                  </Animated.View>
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
  description: {
    backgroundColor: 'transparent',       
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    borderRadius: 15,
    width: '100%',
    height: '30%',
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

export default AddLocal