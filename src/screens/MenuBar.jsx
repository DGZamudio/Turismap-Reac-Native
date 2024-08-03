import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import EditProfile from './EditProfile';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home"
    screenOptions={{
      headerTintColor:'#FFF',
    }}    >
    <Drawer.Screen name="Home" component={HomeScreen}     
          options={{
            title: 'Map',
              headerStyle: {
              backgroundColor: '#212121',
            },
              headerTitleStyle: {
                color: '#212121',
            },
          }}
    />
    <Drawer.Screen name="EditProfile" component={EditProfile}           
          options={{
            title: 'Edit Profile',
              headerStyle: {
              backgroundColor: '#212121',
            },
              headerTitleStyle: {
                color: '#212121',
            },
          }}
    />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
