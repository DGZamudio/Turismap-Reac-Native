import { StyleSheet, TextInput, View, Image, Animated, Pressable, Text } from 'react-native'
import React from 'react'

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
  return (
    <View style={styles.container}>
      <View style={styles.card}>
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
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    card: {
      width: 190,
      height: 254,
      borderRadius: 30,
      backgroundColor: '#212121',
      shadowColor: '#191919',
      shadowOffset: { width: 15, height: 15 },
      shadowOpacity: 1,
      shadowRadius: 30,
      elevation: 15,
    },
    input: {
        margin:'10%',
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
      marginTop:'10%',
      justifyContent:'center',
      alignItems:'center',
    },
    pfp: {
      width:'34%',
      height:'30%',
      borderRadius:50,
    },
    button: {
      marginTop:'5%',
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