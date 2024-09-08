import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Pressable, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps'
import themeContext from '../theme/themeContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Location from 'expo-location';
import { useAlert } from './Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { getData as Get } from '../services/api';

const HomeScreen = () => {

  const theme = useContext(themeContext)
  const [showUB, setShowUB] = useState(false);
  const [_id, set_id] = useState(null);
  const [logged, setLogged] = useState(false);
  const [current, setCurrent] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const mapRef = useRef(null);
  const [region, setRegion] = useState(initialRegion);
  const [DATA, setData] = useState([]);
  const [search, setSearch] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [selectedSite, setSelectedSite] = useState(null);


  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        id = decoded.sub.user_id;
        set_id(id)
        setLogged(true)
      }
    } catch (e) {
      console.error('Error decoding token:', e);
      setLogged(false);
    }
  };

  const initialRegion = {
    latitude: 4.597841,
    longitude: -74.076184,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleMarkerPress = (sitio) => {
    setSelectedSite(sitio);
  };

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso de ubicación denegado');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setOrigin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const selectPointOnMap = (e) => {
    setCurrent(e.nativeEvent.coordinate)
    setShowUB(true)
  };
  
  const handleSelectDestination = (coordinate) => {
    setDestination(coordinate);
    fetchRoute(origin, destination)
  };

  const polygonCoordinates = [
    { latitude: 4.602259, longitude: -74.076613 },
    { latitude: 4.593532, longitude: -74.082185 },
    { latitude: 4.591014, longitude: -74.078180 },
    { latitude: 4.590726, longitude: -74.077133 },
    { latitude: 4.591302, longitude: -74.076736 },
    { latitude: 4.590258, longitude: -74.074390 },
    { latitude: 4.589971, longitude: -74.073272 },
    { latitude: 4.589431, longitude: -74.070565 },
    { latitude: 4.591446, longitude: -74.070493 },
    { latitude: 4.593748, longitude: -74.069230 },
    { latitude: 4.593676, longitude: -74.068183 },
    { latitude: 4.595834, longitude: -74.067462 },
    { latitude: 4.598352, longitude: -74.065766 },
    { latitude: 4.601841, longitude: -74.060028 },
    { latitude: 4.603352, longitude: -74.062482 },
    { latitude: 4.602920, longitude: -74.067281 }, 
    { latitude: 4.601158, longitude: -74.070132 }, 
    { latitude: 4.602165, longitude: -74.074427 },
  ];

  const loadData2 = () => {
    showAlert('', 'loading')
    Get('/get_item')
    .then((response) => response.json())
    .then((data) => {
      hideAlert()
      setData(data);
    })
    .catch((error) => {
      console.error('Error al obtener los sitios turisticos:', error);
      showAlert('There has been an error trying to load the data', 'error')
    });
  }

  const searchData = () => {
    fetch(`https://turismap-backend-python.onrender.com/search_item?q=${encodeURIComponent(search)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setShowLoadingAlert(false)
      setData(data);
    })
    .catch((error) => {
      setShowLoadingAlert(false)
      console.error('Error al obtener los usuarios:', error);
    });
  }

  const filter = () => {
    showAlert('', 'loading')
    Get(`/filter/${_id}`)
    .then((response) => response.json())
    .then(data => {
      hideAlert()
      setData(data)
    })
  }

  useEffect(() => {
    getData()
    loadData2()
  }, [])

  const fetchRoute = async (origin, destination) => {
    if (!origin || !destination) return showAlert('There is no origin point please click on the map to select one or use your location', 'error');
    showAlert('', 'loading')
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/foot/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        hideAlert()
        const route = data.routes[0].geometry.coordinates.map(([longitude, latitude]) => ({
          latitude,
          longitude,
        }));
        setRouteCoordinates(route);
      } else {
        hideAlert()
        console.error('No se encontraron rutas');
      }
    } catch (error) {
      hideAlert()
      console.error('Error al obtener la ruta:', error);
    }
  };

    return(
        <View style={styles.container}>
          <View style={styles.search}>          
            <TextInput placeholder='Search' style={styles.searchContent} />
            <AntDesign name="search1" size={24} color="grey" style={{
              marginRight:15,
            }} onPress={() => getUserLocation()} />
            <Pressable style={styles.refresh}>
              <AntDesign name="reload1" size={24} color="black" onPress={() => loadData2()} />
            </Pressable>
          </View>
          { logged && (
            <View style={[styles.filter, {backgroundColor:theme.bg1}]}>
              <Pressable onPress={() => filter()} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                <AntDesign name="question" size={24} color={theme.title} />
                <Text style={{color:theme.title}}>You may like these places</Text>
              </Pressable>
            </View>
          )}
          <MapView
            ref={mapRef}
            style={styles.map}
            customMapStyle={theme.map}
            loadingEnabled={true}
            showsUserLocation={true}
            region={region}
            followsUserLocation={true}
            initialRegion={initialRegion}
            onPress={selectPointOnMap}
          >
          {origin && 
              <Marker coordinate={origin} image={require('../../assets/pin.png')}/>
          }
          {DATA.map((sitio) => (
            <Marker
              key={sitio._id}
              coordinate={{
                latitude: parseFloat(sitio.altitudSitiosTuristicos),
                longitude: parseFloat(sitio.latitudSitiosTuristicos),
              }}
              onPress={() => handleMarkerPress(sitio)}
            />
          ))}
          {routeCoordinates.length > 0 && (
            <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="red" />
          )}
            <Polygon
              coordinates={polygonCoordinates}
              strokeColor={theme.title}
              fillColor="transparent" 
              strokeWidth={2}
            />
          </MapView>
          {origin && 
            <Pressable style={[styles.close1, {backgroundColor: theme.bg2}]} onPress={() => {setOrigin(null), setRouteCoordinates([])}}>
              <AntDesign name="close" size={24} color="red" />
              <Text style={{color: theme.title}}>Delete origin point</Text>
            </Pressable>
          }
          {selectedSite && (
            <View style={[styles.selected, {backgroundColor: theme.bg2}]}>
              <Pressable style={styles.close} onPress={() => setSelectedSite(false)}>
                <AntDesign name="close" size={24} color="red" />
              </Pressable>
              <Text style={[styles.title, {color: theme.title}]}>{selectedSite.nombreSitiosTuristicos}</Text>
              <Text style={[{color: theme.text}]}>{selectedSite.descripcionSitiosTuristicos}</Text>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                  handleSelectDestination({
                    latitude: parseFloat(selectedSite.altitudSitiosTuristicos),
                    longitude: parseFloat(selectedSite.latitudSitiosTuristicos),
                  });
                  setSelectedSite(null);
                }}
              >
                <Text style={styles.buttonText}>Select destination</Text>
              </TouchableOpacity>
            </View>
          )}
          <AwesomeAlert
            show={showUB}
            showProgress={false}
            title="Do you want to set this location your origin?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={true}
            confirmText="I am sure"
            confirmButtonColor="#00bb00"
            onCancelPressed={() => setShowUB(false)}
            onConfirmPressed={() => {setOrigin(current), setShowUB(false)}}
          />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#000',
        alignItems:'center',
    },
    map: {
        width:'100%',
        height:'100%',
    },
    search: {
      position:'absolute',
      zIndex:1,
      top:'90%',
      flexDirection:'row',
      backgroundColor:'#D4D4D4',
      borderRadius:30,
      color: '#646464',
      justifyContent:'space-around',
      borderWidth:3,
      borderColor:'#000',
      width:'65%',
      alignItems:'center',
    },
    filter:{
      position:'absolute',
      zIndex:1,
      margin: '5%',
      borderRadius:5,
      padding:5
    },
    selected: {
      position:'absolute',
      zIndex:1,
      top:'40%',
      borderRadius:30,
      padding:'5%',
      margin:'5%',
    },
    title: {
      textAlign:'center',
      fontSize:24,
    },
    close: {
      alignItems:'flex-end'
    },
    close1: {
      position:'absolute',
      zIndex:2,
      margin:'5%',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      padding:'2%',
      borderRadius:10,
    },
    searchContent: {
      textAlign:'center',
      alignItems:'center',
      width:'70%',
      height:30,
    },
    button: {
      marginTop: 5,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: '#1E90FF',
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
})
export default HomeScreen;