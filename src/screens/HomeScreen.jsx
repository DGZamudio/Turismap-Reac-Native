import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, StatusBar, TextInput, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MapView, { Polygon, Marker } from 'react-native-maps'
import AwesomeAlert from 'react-native-awesome-alerts';

const HomeScreen = () => {
    const initialRegion = {
      latitude: 4.597841,
      longitude: -74.076184,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const mapRef = useRef(null);
    const [region, setRegion] = useState(initialRegion);
    const [DATA, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showLoadingAlert, setShowLoadingAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
  
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
      setShowLoadingAlert(true)
      fetch('https://turismap-backend-python.onrender.com/get_item', {
        method: 'GET',

      })
      .then((response) => response.json())
      .then((data) => {
        setShowLoadingAlert(false)
        setAlertMessage('The data has been succesfully loaded')
        setData(data);
        setShowAlert(true);
      })
      .catch((error) => {
        setShowLoadingAlert(false)
        console.error('Error al obtener los sitios turisticos:', error);
        setErrorMessage('There has been an error trying to load the data')
        setShowErrorAlert(true);
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
    

    return(
        <View style={styles.container}>
          <View style={styles.search}>          
            <TextInput placeholder='Search' style={styles.searchContent} />
            <AntDesign name="search1" size={24} color="grey" style={{
              marginRight:15,
            }} />
            <Pressable style={styles.refresh}>
              <AntDesign name="reload1" size={24} color="black" onPress={() => loadData2()} />
            </Pressable>
          </View>
          <StatusBar setStatusBarStyle='light-content'></StatusBar>
          <MapView
            ref={mapRef}
            style={styles.map}
            customMapStyle={mapDarkStyle}
            loadingEnabled={true}
            showsUserLocation={true}
            region={region}
            initialRegion={initialRegion}
          >
          {DATA.map((sitio) => (
            <Marker
              key={sitio._id}
              coordinate={{
                latitude: parseFloat(sitio.altitudSitiosTuristicos),
                longitude: parseFloat(sitio.latitudSitiosTuristicos),
              }}
              title={sitio.nombreSitiosTuristicos}
              description={sitio.descripcionSitiosTuristicos}
            />
          ))}
            <Polygon
              coordinates={polygonCoordinates}
              strokeColor="rgba(0,255,0,255)"
              fillColor="transparent" 
              strokeWidth={2}
            />
          </MapView>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Success"
              message={alertMessage}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="#00bb00"
              onConfirmPressed={() => setShowAlert(false)}
            />
            <AwesomeAlert
              show={showErrorAlert}
              showProgress={false}
              title="Error"
              message={errorMessage}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="#e23636"
              onConfirmPressed={() => setShowErrorAlert(false)}
            />
            <AwesomeAlert
              show={showLoadingAlert}
              showProgress={false}
              title="Loading ..."
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={true}
              showCancelButton={false}
              showConfirmButton={false}
            />
        </View>
    );
};
const mapDarkStyle =[
    
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      
]
const mapStandardStyle = [
    {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
]
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
    }
})
export default HomeScreen;