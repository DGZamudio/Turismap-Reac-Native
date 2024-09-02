import { StyleSheet, TextInput, View, Image, Animated, Pressable, Text } from 'react-native'
import React, {useContext, useState} from 'react'
import { CommonActions } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import themeContext from '../theme/themeContext';

const EditProfile = ({ route, navigation }) => {
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
  const { data } = route.params;
  const [_id] = useState(data._id)
  const [nombreUsuario, setNombreUsuario] = useState(data.nombreUsuario)
  const [newPass, setNewPass] = useState('')
  const [oldPass, setOldPass] = useState('')
  const sinCaracteresEspeciales = /^[a-zA-Z0-9]*$/;

  const [showAlert, setShowAlert] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const editdata = (id) => {
    setShowLoadingAlert(true)
    if (nombreUsuario !== '' && sinCaracteresEspeciales.test(nombreUsuario)) {
      fetch(`https://turismap-backend-python.onrender.com/update_user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nombreUsuario:nombreUsuario,estadoUsuario:'1',rolUsuario:'1'})
      })
      .then(resp => resp.json())
      .then(data => {
        setShowLoadingAlert(false)
        setAlertMessage('The user has been modified correctly')
        setShowAlert(true)
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
          })
      );
      })
      .catch(error => {
        setShowLoadingAlert(false)
        setErrorMessage('The was an error trying to edit the user')
        setShowErrorAlert(true)
        console.log(error)
      })
    }
    else{
      setShowLoadingAlert(false)
      setErrorMessage('The user cant have special characters in his name')
      setShowErrorAlert(true)
    }
  }

  const editPass = (id) => {
      setShowLoadingAlert(true)
      if (newPass.length >= 8 && newPass !== '') {
        fetch(`https://turismap-backend-python.onrender.com/update_pass/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({oldPass:oldPass,contrasenaUsuario:newPass,estadoUsuario:'1',rolUsuario:'1'})
        })
        .then(resp => resp.json())
        .then(data => {
          setShowLoadingAlert(false)
          if (data.mensaje === 'Usuario actualizado exitosamente') {
            setAlertMessage('The password was modified correctly');
            setShowAlert(true);
            navigation.dispatch(
              CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
              })
          );
          } else {
              if(data.mensaje === 'La contraseña antigua no es correcta'){
                setErrorMessage('The password related to this user isnt the one you gived');
                setShowErrorAlert(true);
              }
          }
        })
        .catch(error => {
          setShowLoadingAlert(false)
          setErrorMessage('There was an error trying to edit the user')
          setShowErrorAlert(true)
          console.log(error)
        });
      } 
      else {
        setShowLoadingAlert(false)
        setErrorMessage('The password has to be eight characters')
        setShowErrorAlert(true) 
      }
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.bg1}]}>
      <View style={[styles.card, {backgroundColor: theme.bg2}]}>
        <Text style={[styles.text, {color: theme.title, borderBottomColor: theme.title}]}>Edit profile</Text>
        <View style={styles.cardContent}>
          <Image source={require('../../assets/pfp.jpg')} style={styles.pfp} />
          <TextInput style={[styles.input, {color: theme.text, borderBottomColor: theme.title}]} placeholder="Username" placeholderTextColor={theme.text} value={nombreUsuario} onChangeText = {text => setNombreUsuario(text)}/>

          <Pressable
                    onPress={() => editdata(_id)}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={[styles.button, {backgroundColor: theme.title}]}
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
                        <Text style={[styles.buttonText, {color: theme.bg1}]}>Save Changes</Text>
                    </Animated.View>
          </Pressable>
        </View>
      </View>

      <View style={[styles.card, {backgroundColor: theme.bg2}]}>
        <Text style={[styles.text, {color: theme.title, borderBottomColor: theme.title}]}>Change Password</Text>
        <View style={styles.cardContent}>
          <TextInput style={[styles.input, {color: theme.text, borderBottomColor: theme.title}]} placeholder="Old password" secureTextEntry={true} placeholderTextColor={theme.text} onChangeText = {text => setOldPass(text)}/>
          <TextInput style={[styles.input, {color: theme.text, borderBottomColor: theme.title}]} placeholder="New password" secureTextEntry={true} placeholderTextColor={theme.text} onChangeText = {text => setNewPass(text)} />
          <Pressable
                    onPress={() => editPass(_id)}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={[styles.button, {backgroundColor: theme.title}]}
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
                        <Text style={[styles.buttonText, {color: theme.bg1}]}>Save Password</Text>
                    </Animated.View>
          </Pressable>
        </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
      margin:'5%',
      width: '80%',
      height: '40%',
      borderRadius: 30,
      shadowColor: '#191919',
      shadowOffset: { width: 15, height: 15 },
      shadowOpacity: 10,
      shadowRadius: 60,
      elevation: 15,
    },
    input: {
        margin:'5%',
        backgroundColor: 'transparent',       
        borderBottomWidth: 1,
        borderRadius: 15,
        width: '80%',
        padding: 10,
        marginBottom: 10,
    },
    cardContent: {
      justifyContent:'center',
      alignItems:'center',
    },
    text:{
      margin:'3%',
      fontWeight: 'bold',
      fontSize: 15,
      borderBottomWidth: 1,
      textAlign:'center',
    },
    pfp: {
      width:70,
      height:70,
      borderRadius:50,
    },
    button: {
      marginTop:'10%',
      borderRadius: 30,
      overflow: 'hidden',
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
      fontWeight: 'bold',
      fontSize: 15,
  },
});

export default EditProfile