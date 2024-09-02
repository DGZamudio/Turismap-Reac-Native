import React, {useState, useEffect, useContext} from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreen from './HomeScreen';
import EditProfile from './EditProfile';
import Login from './LoginScreen'
import NavCrud from './NavCrud'
import { View, Image, Text, Pressable, Switch, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../theme/themeContext';
import Svg, { Circle, Path } from 'react-native-svg';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

  const theme = useContext(themeContext)
  const [userData, setUserData] = useState(null);
  const [logged, setLogged] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
      headerTintColor: theme.title,
      drawerStyle: {
        backgroundColor: theme.bg2,
      },
      headerStyle: {
        backgroundColor:theme.bg2,
      },
      headerTitleStyle:{
        color:theme.bg2,
      },
      drawerLabelStyle:{
        color:theme.title,
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
                  color: theme.title,
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
                    <AntDesign name="logout" size={24} color={theme.title} />
                    <Text style={{ color: theme.title }}>Sign Out</Text>
                  </Pressable>
              </>
              )}
              <View style={styles.container}>
                <View style={styles.iconsContainer}>
                  {darkMode ? (
                    <Svg style={styles.moon} viewBox="0 0 384 512" width={24} height={24}>
                      <Path
                        fill="#73C0FC"
                        d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
                      />
                    </Svg>
                  ) : (
                    <Svg style={styles.sun} viewBox="0 0 24 24" width={24} height={24}>
                      <Circle cx="12" cy="12" r="5" fill="#ffd43b" />
                      <Path
                        fill="#ffd43b"
                        d="M21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"
                      />
                    </Svg>
                  )}
                </View>
                <Switch 
                  trackColor={{ false: '#73C0FC', true: '#183153' }}
                  thumbColor="#e8e8e8"
                  ios_backgroundColor="#3e3e3e"
                  value = {darkMode}
                  onValueChange = {(value) => {
                    setDarkMode(value);
                    EventRegister.emit('ChangeTheme', value)
                  }}
                  style={styles.switch}
                />
              </View>
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
              <AntDesign name="home" size={24} color={theme.title} />
            ),
          }}
    />
    { logged ? (
      <>
        <Drawer.Screen name="EditProfile" component={EditProfile} initialParams={{ data: userData.sub }}
          options={{
            title: 'Edit Profile',
            drawerIcon: () => (
              <AntDesign name="user" size={24} color={theme.title} />
            )
          }}
        />
      { userData.sub.rolUsuario === '2' && (
        <Drawer.Screen name="Crud" component={NavCrud}           
          options={{
            title: 'Lists',
            drawerIcon: () => (
              <AntDesign name="setting" size={24} color={theme.title} />
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
              <AntDesign name="logout" size={24} color={theme.title} />
            )
          }}
        />
      </>
    )}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsContainer: {
    position: 'relative',
  },
})
export default DrawerNavigator;
