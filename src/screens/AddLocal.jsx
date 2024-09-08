import React, {useContext, useState} from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Animated, FlatList } from 'react-native';
import { Video } from 'expo-av';
import themeContext from '../theme/themeContext';
import { RadioButton } from 'react-native-paper';
import { useAlert } from './Alert';
import { sendData } from '../services/api';

const AddLocal = () => {
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
  const [check, setCheck] = useState("0")

  const { showAlert, hideAlert } = useAlert();
  const sinCaracteresEspeciales = /^[a-zA-Z0-9]*$/;

  const options = [
    { id:"1", title:'Historical Heritage'},
    { id:"2", title:'Art'},
    { id:"3", title:'Museums and galleries'},
    { id:"4", title:'Literature'},
    { id:"5", title:'Performing arts'},
    { id:"6", title:'Iconic places'}
    ]

  const renderCheck = ({item}) => {
    return(
        <>
        <View style={{backgroundColor:'#2020208a', flexDirection:'row', borderRadius:20, width:'95%'}}>
            <RadioButton
                value={item.id}
                status={ check === item.id ? 'checked' : 'unchecked' }
                onPress={() => setCheck(item.id)}
                color='#FFF'
                uncheckedColor='#FFF'
            />
            <Text style={styles.input2}>{item.title}</Text>
        </View>
        </>
    )
  }

  const insertData = () => {
    showAlert('','loading')
    if (nombreLocal === '' || descripcion === '' || altitud === '' || longitud === '' || horarios === '' || check === '0') {
        showAlert('Please fill all the blanks', 'error')
    }
    else {
        sendData('/new_item', {nombreSitiosTuristicos:nombreLocal,descripcionSitiosTuristicos:descripcion,altitudSitiosTuristicos:altitud,latitudSitiosTuristicos:longitud,horariosSitiosTuristicos:horarios,tipoSitiosTuristicos:check, estadoSitiosTuristicos:"1"})
          .then(resp => resp.json())
          .then(data => {       
                showAlert('Local was added succesfully', 'success')
          })
          .catch(error => {
              showAlert('There was an error creating the local', 'error')
              console.error(error)
          })
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
              <TextInput placeholder="Local name" style={styles.input} placeholderTextColor="#f8f9fa" value={nombreLocal} onChangeText = {text => setNombreLocal(text)}/>
              <TextInput placeholder="Description" style={styles.description} placeholderTextColor="#f8f9fa" value={descripcion} onChangeText = {text => setDescripcion(text)}/>
              <TextInput placeholder="Altitude" style={styles.input} placeholderTextColor="#f8f9fa" value={altitud} onChangeText = {text => setAltitud(text)}/>
              <TextInput placeholder="Longitude" style={styles.input} placeholderTextColor="#f8f9fa" value={longitud} onChangeText = {text => setLongitud(text)}/>
              <TextInput placeholder="Opens & closes at" style={styles.input} placeholderTextColor="#f8f9fa" value={horarios} onChangeText = {text => setHorarios(text)}/>
              <FlatList
                data={options}
                renderItem={renderCheck}
                keyExtractor={(item) => item.id}
              />
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
  input2: {
    backgroundColor: 'transparent',       
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
    height: '10%',
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