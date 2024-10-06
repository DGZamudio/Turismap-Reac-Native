import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddUser from './AddUser';
import Crud from './Crud';
import EditUser from './Edituser';
import AddLocal from './AddLocal';
import themeContext from '../theme/themeContext';
import EditLocal from './EditLocal'

const Stack = createStackNavigator();

const NavCrud = () => {
  theme = React.useContext(themeContext)
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Crud"
          screenOptions={{
            headerTintColor: theme.title,
            drawerStyle: {
              backgroundColor: theme.bg2,
            },
            headerStyle: {
              backgroundColor: theme.bg2,
            },
            headerTitleStyle:{
              color: theme.bg2,
            },
            drawerLabelStyle:{
              color:theme.bg2,
            },
          }}>
        <Stack.Screen name="Crud" component={Crud} options={{ headerShown: false }}/>
        <Stack.Screen name="AddUser" component={AddUser}/>
        <Stack.Screen name="AddLocal" component={AddLocal}/>
        <Stack.Screen name="EditProfile" component={EditUser}/>
        <Stack.Screen name="EditLocal" component={EditLocal}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavCrud;
