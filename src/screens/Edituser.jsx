import { StyleSheet, TextInput, View, Image, Animated, Pressable, Text } from 'react-native'
import React, {useState, useContext} from 'react'
import themeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAlert } from './Alert';

const EditUser = ({ route, navigation }) => {
  const theme = useContext(themeContext)
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
  const { data } = route.params;
  const [_id] = useState(data._id)
  const [nombreUsuario, setNombreUsuario] = useState(data.nombreUsuario)
  const [newPass, setNewPass] = useState('')
  const [oldPass, setOldPass] = useState('')
  const sinCaracteresEspeciales = /^[a-zA-Z0-9]*$/;

  const { showAlert, hideAlert } = useAlert();

  const updateToken = async (newToken) => {
    try {
        await AsyncStorage.setItem('token', newToken);
    } catch (error) {
        console.error('Error al guardar el nuevo token:', error);
    }
  };

  const editdata = (id) => {
    showAlert('','loading')
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
        updateToken(data.access_token);
        hideAlert()
        showAlert('The user has been modified correctly', 'success')
        navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{ name: 'Redirect' }],
          })
      );
      })
      .catch(error => {
        hideAlert()
        showAlert('The was an error trying to edit the user', 'error')
        console.log(error)
      })
    }
    else{
      hideAlert()
      showAlert('The user cant have special characters in his name', 'error')
      
    }
  }

  const editPass = (id) => {
    showAlert('', 'loading')
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
        hideAlert()
        if (data.mensaje === 'Usuario actualizado exitosamente') {
          showAlert('The password was modified correctly', 'success');
          navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
        } else {
            if(data.mensaje === 'La contraseña antigua no es correcta'){
              showAlert('The password related to this user isnt the one you gived', 'error');
            }
        }
      })
      .catch(error => {
        hideAlert()
        showAlert('There was an error trying to edit the user', 'error')
        console.log(error)
      });
    } 
    else {
      hideAlert()
      showAlert('The password has to be eight characters', 'error')  
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
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#050505',
    },
    card: {
      margin:'5%',
      width: '80%',
      height: '40%',
      borderRadius: 30,
      backgroundColor: '#212121',
      shadowColor: '#191919',
      shadowOffset: { width: 15, height: 15 },
      shadowOpacity: 10,
      shadowRadius: 60,
      elevation: 15,
    },
    input: {
        margin:'5%',
        backgroundColor: 'transparent',       
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        borderRadius: 15,
        width: '80%',
        padding: 10,
        marginBottom: 10,
        color: '#f8f9fa',
    },
    cardContent: {
      justifyContent:'center',
      alignItems:'center',
    },
    text:{
      margin:'3%',
      color:'#FFF',
      fontWeight: 'bold',
      fontSize: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#f8f9fa',
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
      fontSize: 15,
  },
});

export default EditUser