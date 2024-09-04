import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Pressable, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps'
import themeContext from '../theme/themeContext';
import * as Location from 'expo-location';
import { useAlert } from './Alert';

const HomeScreen = () => {

  const theme = useContext(themeContext)
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const mapRef = useRef(null);
  const [region, setRegion] = useState(initialRegion);
  const [DATA, setData] = useState([]);
  const [search, setSearch] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [selectedSite, setSelectedSite] = useState(null);

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
    setOrigin(e.nativeEvent.coordinate);
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
    fetch('https://turismap-backend-python.onrender.com/get_item', {
      method: 'GET',

    })
    .then((response) => response.json())
    .then((data) => {
      hideAlert()
      setData(data);
    })
    .catch((error) => {
      hideAlert()
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

  useEffect(() => {
    loadData2()
  }, [])

  const fetchRoute = async (origin, destination) => {
    if (!origin || !destination) return showAlert('There is no origin point please select one', 'error');
    showAlert('', 'loading')
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`
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
          {origin && <Marker coordinate={origin} />}
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
          {selectedSite && (
            <View style={styles.search}>
              <Text>{selectedSite.nombreSitiosTuristicos}</Text>
              <Text>{selectedSite.descripcionSitiosTuristicos}</Text>
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
                <Text style={styles.buttonText}>Elegir destino</Text>
              </TouchableOpacity>
            </View>
          )}
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
      width:'65%'
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