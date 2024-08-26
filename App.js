import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import MenuBar from './src/screens/MenuBar';
import RecoverPass from './src/screens/RecoverPass';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import Redirect from './src/screens/Redirect';

const Stack = createStackNavigator();

const App = () => {
  return (
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
  );
};

export default App;
