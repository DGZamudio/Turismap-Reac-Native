import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import MenuBar from './src/screens/MenuBar';
import RecoverPass from './src/screens/RecoverPass';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import Redirect from './src/screens/Redirect';
import theme from './src/theme/theme';
import themeContext from './src/theme/themeContext';
import { EventRegister } from 'react-native-event-listeners';

const Stack = createStackNavigator();

const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {(
      setDarkMode(data)
    )})
    return() => {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={MenuBar} options={{ headerShown: false }}/>
          <Stack.Screen name="RecoverPass" component={RecoverPass} options={{ headerShown: false }}/>
          <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Redirect" component={Redirect} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
};

export default App;
