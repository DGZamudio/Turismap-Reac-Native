import { StyleSheet, TextInput, View, Image, Animated, Pressable, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import AwesomeAlert from 'react-native-awesome-alerts';

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
  const { data } = route.params;
  const [_id] = useState(data._id)
  const [nombreUsuario, setNombreUsuario] = useState(data.nombreUsuario)
  const [contrasenaUsuario] = useState(data.contrasenaUsuario)
  const [newPass, setNewPass] = useState('')
  const [oldPass, setOldPass] = useState('')

  const [showAlert, setShowAlert] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const editdata = (id) => {
    setShowLoadingAlert(true)
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
      navigation.navigate('Crud')
    })
    .catch(error => {
      setShowLoadingAlert(false)
      setErrorMessage('The was an error trying to edit the user')
      setShowErrorAlert(true)
      console.log(error)
    })
  }

  const editPass = (id) => {
    if (contrasenaUsuario == oldPass) {
      fetch(`https://turismap-backend-python.onrender.com/update_user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({contrasenaUsuario:newPass,estadoUsuario:'1',rolUsuario:'1'})
      })
      .then(resp => resp.json())
      .then(data => {
        setShowLoadingAlert(false)
        setAlertMessage('The password was modified correctly')
        setShowAlert(true)
        navigation.navigate('Crud')
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
      setErrorMessage('Your password isnt the one that is registered')
      setShowErrorAlert(true)
      console.log('Contraseña incorrecta')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Edit profile</Text>
        <View style={styles.cardContent}>
          <Image source={require('../../assets/pfp.jpg')} style={styles.pfp} />
          <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#f8f9fa" value={nombreUsuario} onChangeText = {text => setNombreUsuario(text)}/>

          <Pressable
                    onPress={() => editdata(_id)}
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
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </Animated.View>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>Change Password</Text>
        <View style={styles.cardContent}>
          <TextInput style={styles.input} placeholder="Old password" secureTextEntry={true} placeholderTextColor="#f8f9fa" onChangeText = {text => setOldPass(text)}/>
          <TextInput style={styles.input} placeholder="New password" secureTextEntry={true} placeholderTextColor="#f8f9fa" onChangeText = {text => setNewPass(text)} />
          <Pressable
                    onPress={() => editPass(_id)}
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
                        <Text style={styles.buttonText}>Save Password</Text>
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

export default EditProfile