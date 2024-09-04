import React, { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { Video } from 'expo-av';
import themeContext from '../theme/themeContext';
import { useAlert } from './Alert';

const LoginScreen = ({ navigation }) => {
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

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const theme = useContext(themeContext)
    const [correoUsuario, setCorreoUsuario] = useState("")
    const [contrasenaUsuario, setContrasenaUsuario] = useState("")

    const { showAlert, hideAlert } = useAlert();

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('token', value);
        } catch (e) {
            console.error(e)
        }
      };

    const login = () => {
        showAlert('alert', 'loading')
        if(correoUsuario === ''){
            hideAlert()
            showAlert('Email cant be empty', 'error');
        }
        else {
            if(contrasenaUsuario === ''){
                hideAlert()
                showAlert('Pasword cant be empty', 'error');    
            }
            else {
                if(regexCorreo.test(correoUsuario)){
                    fetch('https://turismap-backend-python.onrender.com/login', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({correoUsuario:correoUsuario,contrasenaUsuario:contrasenaUsuario})
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.mensaje === 'Contraseña incorrecta') {
                            hideAlert()
                            showAlert('Invalid password', 'error');
                        }
                        else {
                            if (data.access_token) {
                                hideAlert()
                                showAlert('User was logged succesfully', 'succes')
                                storeData(data.access_token)
                                navigation.navigate('Redirect')
                          } else {
                            hideAlert()
                            showAlert('Login failed try again', 'error');
                          }
                        }
                    })
                    .catch(error => {
                        hideAlert()
                        showAlert('There was an error logging in', 'error');
                        console.error('Error:', error);
                      });
                }
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Video
                source={{ uri: theme.uri }}
                style={styles.backgroundVideo}
                isMuted={true}
                isLooping
                shouldPlay
                resizeMode="cover"
            />
            <View style={styles.card}>
                <Text style={[styles.title]}>Turismap</Text>
                <Image source={require('../../assets/Turismap Logo Minimalist.png')} style={styles.logo} />
                <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} placeholderTextColor="#f8f9fa" onChangeText={text => setCorreoUsuario(text)}/>
                <TextInput placeholder="Password" style={styles.input} secureTextEntry={true} placeholderTextColor="#f8f9fa" onChangeText={text => setContrasenaUsuario(text)}/>
                <View style={styles.recov}>
                    <Text style={styles.passwordInfo}>If you forgot your password </Text>
                    <Pressable
                        onPress={() => navigation.navigate('RecoverPass')}
                    >
                        <Text style={styles.passwordInfo1}>
                            Click here!
                        </Text>
                    </Pressable>
                </View>
                <Pressable
                    onPress={() => login()}
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
                        <Text style={styles.buttonText}>Sign in</Text>
                    </Animated.View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Register')} style={styles.loginButton}>
                    <Text style={styles.loginText}>Sign up</Text>
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
    recov:{
        flexDirection:'row',
    },
    passwordInfo: {
        color: '#f8f9fa',
        marginBottom: 10,
        textAlign: 'center',
    },
    passwordInfo1: {
        color: '#f8f9fa',
        marginBottom: 10,
        fontWeight:'bold',
        borderBottomWidth:1,
        borderBottomColor:'#f8f9fa',
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

export default LoginScreen;
