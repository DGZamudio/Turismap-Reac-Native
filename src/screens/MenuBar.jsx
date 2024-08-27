import React, {useState, useEffect} from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreen from './HomeScreen';
import EditProfile from './EditProfile';
import Login from './LoginScreen'
import NavCrud from './NavCrud'
import { View, Image, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

  const [userData, setUserData] = useState(null);
  const [logged, setLogged] = useState(false);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUserData(decoded);
        setLogged(true)
      }
    } catch (e) {
      console.error('Error decoding token:', e);
    }
  };

  const singOut = async () => {
    try{
      await AsyncStorage.removeItem('token');
      setLogged(false);
      console.log('Succesfully logged out')
    }
    catch (e){
      console.error(e)
    }
  }

  useEffect(() => {
    getData()
  }, []);

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
              { logged && (
              <>
                <Text style={{
                  marginTop: '3%',
                  color: '#FFF',
                }}>{userData.sub.nombreUsuario}</Text>
                  <Pressable onPress={() => singOut()} style={{
                    borderRadius:5,
                    backgroundColor:'#c13636',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginLeft:'5%',
                    marginRight:'5%',
                    marginTop:'5%',
                  }}>
                    <AntDesign name="logout" size={24} color="white" />
                    <Text style={{ color: '#FFF' }}>Sign Out</Text>
                  </Pressable>
              </>
              )}
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
    { logged ? (
      <>
        <Drawer.Screen name="EditProfile" component={EditProfile} initialParams={{ data: userData.sub }}
          options={{
            title: 'Edit Profile',
            drawerIcon: () => (
              <AntDesign name="user" size={24} color="white" />
            )
          }}
        />
      { userData.sub.rolUsuario === '2' && (
        <Drawer.Screen name="Crud" component={NavCrud}           
          options={{
            title: 'Lists',
            drawerIcon: () => (
              <AntDesign name="setting" size={24} color="white" />
            )
          }}
        />
      )}
      </>
    ) : (
      <>
        <Drawer.Screen name="Login" component={Login}           
          options={{
            title: 'Log in',
            headerShown: false, 
            drawerIcon: () => (
              <AntDesign name="logout" size={24} color="white" />
            )
          }}
        />
      </>
    )}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
