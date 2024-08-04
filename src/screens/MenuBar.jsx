import React from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreen from './HomeScreen';
import EditProfile from './EditProfile';
import Login from './LoginScreen'
import { View, Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home"
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
    }}
    drawerContent={
      (props) => {
        return(
          <SafeAreaView>
            <View
              style={{
                height:'40%',
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
              }}
            >
              <Image source={require('../../assets/pfp.jpg')} style={{
                      width:70,
                      height:70,
                      borderRadius:50,
                    }} 
              />
              <Text style={{
                marginTop:'3%',
                color:'#FFF',
              }}>Username</Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        )
      }
    }    
    >
    <Drawer.Screen name="Home" component={HomeScreen}     
          options={{
            title: 'Map',
            drawerIcon: () => (
              <AntDesign name="home" size={24} color="white" />
            ),
          }}
    />
    <Drawer.Screen name="EditProfile" component={EditProfile}           
          options={{
            title: 'Edit Profile',
            drawerIcon: () => (
              <AntDesign name="user" size={24} color="white" />
            )
          }}
    />
    <Drawer.Screen name="Login" component={Login}           
          options={{
            title: 'Log out',
            drawerIcon: () => (
              <AntDesign name="logout" size={24} color="white" />
            )
          }}
    />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
