import React, { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';
import themeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndexScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const scaleAnim = useRef(new Animated.Value(0.80)).current;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const checkFirstLaunch = async () => {
    try {
      const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
      if (alreadyLaunched === null) {
        setIsLoggedIn(false)
        await AsyncStorage.setItem('alreadyLaunched', 'true');
      }
      else{
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error("Error accediendo a AsyncStorage", error);
    } finally {
      setDataLoaded(true)
    }
  };

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setAnimationFinished(true);
    });

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (animationFinished && dataLoaded) {
      if (isLoggedIn) {
        navigation.replace('Home');
      } else {
        navigation.replace('PreT');
      }
    }
  }, [animationFinished, dataLoaded, isLoggedIn]);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg1 }]}>
      <Animated.View
        style={[
          styles.splash,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
          <Image
            source={require('../../assets/icon.png')}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
      </Animated.View>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splash: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
