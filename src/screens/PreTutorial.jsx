import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const PreTutorial = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Image
          source={require('../../assets/icon.png')}
          style={{ width: 150, height: 150 }}
        />
      <Text style={styles.title}>Welcome to Turismap</Text>
      <Text style={styles.question}>Are you new?</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Tutorial')}>
        <Text style={styles.buttonText}>Yes, I'm new</Text>
        <Text style={styles.buttonText}>Go to Tutorial</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>No, I'm not new</Text>
        <Text style={styles.buttonText}>Go to main menu</Text>
      </Pressable>
    </View>
  );
};

export default PreTutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '25%',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    margin:'15%'
  },
  buttonText:{
    color: '#FFF'
  },
  question: {
    textAlign: 'center',
    fontSize: 25,
    margin:'5%'
  },
  button: {
    margin: '5%',
    padding:'5%',
    width:'90%',
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#185fc9'
  }
});
