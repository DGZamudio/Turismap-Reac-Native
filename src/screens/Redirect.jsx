import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const RedirectScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  }, [navigation]);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default RedirectScreen;
