import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, StatusBar, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MapView, { Polygon } from 'react-native-maps'

const HomeScreen = () => {
    const initialRegion = {
      latitude: 4.597841,
      longitude: -74.076184,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const containsLocation = (location, polygon) => {
      const { latitude, longitude } = location;
      let isInside = false;
      const numVertices = polygon.length;
    
      for (let i = 0, j = numVertices - 1; i < numVertices; j = i++) {
        const xi = polygon[i].latitude, yi = polygon[i].longitude;
        const xj = polygon[j].latitude, yj = polygon[j].longitude;
        const intersect = ((yi > longitude) !== (yj > longitude))
          && (latitude < (xj - xi) * (longitude - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
      }
      return isInside;
    };

    const mapRef = useRef(null);
    const [region, setRegion] = useState(initialRegion);
  
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
  
    const isLocationInPolygon = (location) => {
      return containsLocation(location, polygonCoordinates);
    };
  
    const handleRegionChangeComplete = useCallback((newRegion) => {
      const center = {
        latitude: newRegion.latitude + newRegion.latitudeDelta / 2,
        longitude: newRegion.longitude + newRegion.longitudeDelta / 2,
      };
  
      if (!isLocationInPolygon(center)) {
        if (mapRef.current) {
          mapRef.current.animateToRegion(initialRegion, 1000);
        }
        setRegion(initialRegion);
      } else {
        setRegion(newRegion);
      }
    }, [initialRegion]);
  
  
    return(
        <View style={styles.container}>
          <View style={styles.search}>          
            <TextInput placeholder='Search' style={styles.searchContent} />
            <AntDesign name="search1" size={24} color="grey" style={{
              marginRight:15,
            }} />
          </View>
          <StatusBar setStatusBarStyle='light-content'></StatusBar>
          <MapView
            ref={mapRef}
            style={styles.map}
            customMapStyle={mapDarkStyle}
            loadingEnabled={true}
            showsUserLocation={true}
            region={region}
            onRegionChangeComplete={handleRegionChangeComplete}
            initialRegion={initialRegion}
          >  
            <Polygon
              coordinates={polygonCoordinates}
              strokeColor="#A00"
              fillColor="rgba(255,0,0,0)" 
              strokeWidth={2}
            />
          </MapView>
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