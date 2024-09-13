import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import MenuBar from './src/screens/MenuBar';
import RecoverPass from './src/screens/RecoverPass';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import Redirect from './src/screens/Redirect';
import TermsAndConditions from './src/screens/TermsConditions';
import theme from './src/theme/theme';
import themeContext from './src/theme/themeContext';
import IndexScreen from './src/screens/IndexScreen';
import PreTutorial from './src/screens/PreTutorial';
import { EventRegister } from 'react-native-event-listeners';
import { AlertProvider } from './src/screens/Alert';
import Tutorial from './src/screens/Tutorial';

const Stack = createStackNavigator();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data);
    });

    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, []);

  return (
    <themeContext.Provider value={darkMode ? theme.dark : theme.light}>
      <AlertProvider>
        <NavigationContainer>
          <StatusBar style={darkMode ? 'light' : 'dark'} />
          <Stack.Navigator initialRouteName="Index">
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={MenuBar} options={{ headerShown: false }} />
            <Stack.Screen name="RecoverPass" component={RecoverPass} options={{ headerShown: false }} />
            <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Redirect" component={Redirect} options={{ headerShown: false }} />
            <Stack.Screen name="TM" component={TermsAndConditions} options={{ headerShown: false }} />
            <Stack.Screen name="Index" component={IndexScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PreT" component={PreTutorial} options={{ headerShown: false }} />
            <Stack.Screen name="Tutorial" component={Tutorial} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertProvider>
    </themeContext.Provider>
  );
};

export default App;
