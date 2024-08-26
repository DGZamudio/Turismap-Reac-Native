import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddUser from './AddUser';
import Crud from './Crud';
import EditUser from './Edituser';


const Stack = createStackNavigator();

const NavCrud = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Crud"
          screenOptions={{
            headerTintColor:'#FFF',
            drawerStyle: {
              backgroundColor: '#212121',
            },
            headerStyle: {
              backgroundColor:'#212121',
            },
            headerTitleStyle:{
              color:'#212121',
            },
            drawerLabelStyle:{
              color:'#FFF',
            },
          }}>
        <Stack.Screen name="Crud" component={Crud} options={{ headerShown: false }}/>
        <Stack.Screen name="AddUser" component={AddUser}/>
        <Stack.Screen name="EditProfile" component={EditUser}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavCrud;
