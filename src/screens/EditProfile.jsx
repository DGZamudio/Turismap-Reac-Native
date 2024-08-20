import { StyleSheet, TextInput, View, Image, Animated, Pressable, Text } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React, {useState, useEffect} from 'react'

const EditProfile = ({ navigation }) => {
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
  const [contrasenaUsuario, setContrasenaUsuario] = useState("")

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const insertData = () => {
    fetch(`http://192.168.1.86:5000/update_user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nombreUsuario:nombreUsuario,contrasenaUsuario:contrasenaUsuario,estadoUsuario:'1',rolUsuario:'1'})
    })
    .then(resp => resp.json())
    .then(data => {
      navigation.navigate('Crud')
    })
    .catch(error => console.log(error))
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Edit profile</Text>
        <View style={styles.cardContent}>
          <Image source={require('../../assets/pfp.jpg')} style={styles.pfp} />
          <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#f8f9fa"/>

          <Pressable
                    onPress={() => navigation.navigate('Home')}
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
          <TextInput style={styles.input} placeholder="Old password" placeholderTextColor="#f8f9fa"/>
          <TextInput style={styles.input} placeholder="New password" placeholderTextColor="#f8f9fa"/>
          <Pressable
                    onPress={() => navigation.navigate('Home')}
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