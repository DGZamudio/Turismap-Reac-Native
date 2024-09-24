import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Pressable, Text, FlatList, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps'
import themeContext from '../theme/themeContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Location from 'expo-location';
import { useAlert } from './Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { getData as Get, sendData } from '../services/api';
import Entypo from '@expo/vector-icons/Entypo';

const HomeScreen = ({ navigation, route }) => {

  const theme = useContext(themeContext)
  const [showUB, setShowUB] = useState(false);
  const [reseña, setReseña] = useState(0)
  const [_id, set_id] = useState(null);
  const [filtered, setFiltered] = useState(false)
  const [image, setImage] = useState("")
  const [logged, setLogged] = useState(false);
  const [current, setCurrent] = useState(null);
  const [origin, setOrigin] = useState(null);
  const { site } = route.params || {};
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const mapRef = useRef(null);
  const [region, setRegion] = useState(initialRegion);
  const [DATA, setData] = useState([]);
  const [search, setSearch] = useState("");
  const { showAlert, hideAlert } = useAlert();
  const [selectedSite, setSelectedSite] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1)
  const [filter1, setFilter1] = useState(false)
  const [filter2, setFilter2] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [change, setChange] = useState(true)
  const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGFpZGVyMTgiLCJhIjoiY20xMW4xdXVrMDRzZjJtcTBzMW5zb3BjbCJ9.OMXILYFN8qtCXB561pdrQw';

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
    fetchRoute(origin, coordinate)
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
    setFiltered(false)
    Get('/get_item')
    .then((data) => {
      hideAlert()
      setData(data);
    })
    .catch((error) => {
      console.error('Error al obtener los sitios turisticos:', error);
      showAlert('There has been an error trying to load the data', 'error')
    });
  }

  const getAverage = (id) => {
    Get(`/average-site-rating/${id}`)
    .then((data) => {
      setReseña(data.Promedio)
    })
  }
  
  const searchData = () => {
    showAlert('', 'loading')
    setFiltered(false)
    fetch(`https://turismap-backend-python.onrender.com/search_item?q=${encodeURIComponent(search)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.mensaje === 'No se encontraron usuarios con ese criterio de búsqueda'){
        showAlert('No sites found','error')
        return
      }
      hideAlert()
      setData(data);
    })
    .catch((error) => {
      showAlert('error, try again','error')
      console.error('Error al obtener los usuarios:', error);
    });
  }

  const filtr = (id,pge) => {
    setFilter1(true)
    setFilter2(false)
    showAlert('', 'loading')
    setFiltered(true)
    sendData(`/filtr?page=${pge}&per_page=1`, {sitio: id})
    .then(data => {
      setMaxPage(data.total_pages)
      setData(data.data)
      getImage(data.data[0]._id)
      getAverage(data.data[0]._id)
      setIsLoading(false)
      setChange(false)
      hideAlert()
    })
    .catch((error) => {
      console.error('Error al obtener los sitios turisticos:', error);
      showAlert('There has been an error trying to load the data', 'error')
    });
  }

  const getImage = (id) => {
    setImage("")
    fetch(`https://turismap-backend-python.onrender.com/get_image/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener la imagen");
      }
      return response.text(); 
    })
    .then((base64String) => {
      const imageSrc = `data:image/webp;base64,${base64String}`; 
      setImage(imageSrc); 
    })
    .catch((error) => {
      console.error(error); 
    });
  }

  const filter = (pge) => {
    setFilter1(false)
    setFilter2(true)
    showAlert('', 'loading')
    setFiltered(true)
    Get(`/filter/${_id}?page=${pge}&per_page=1`)
    .then(data => {
      sites = data.data
      setPage(data.page)
      setMaxPage(data.total_pages)
      setData(sites)
      getImage(sites[0]._id)
      getAverage(data.data[0]._id)
      setIsLoading(false)
      setChange(false)
      hideAlert()
    })
    .catch((error) => {
      console.error('Error al obtener los sitios turisticos:', error);
      showAlert('You havent setted your preferences', 'error')
    });
  }

  const IMGS = {
    1: require('../../assets/HGM.png'),
    2: require('../../assets/ArtM.png'),
    3: require('../../assets/MuseumM.png'),
    4: require('../../assets/LiteratureM.png'),
    5: require('../../assets/Art2M.png'),
    6: require('../../assets/IconicM.png'),
  };

  const stars = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'}
  ]

  const getIconForType = (type) => {
    return IMGS[type] || IMGS['1'];
  };

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (DATA && DATA.length > 0){
      const newRegion = {
        latitude: parseFloat(DATA[0].altitudSitiosTuristicos),
        longitude: parseFloat(DATA[0].latitudSitiosTuristicos),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  }, [DATA])

  useEffect(() => {
    setChange(true)
    setPage(1)
    if (site) {
      filtr(site,1)
    }
    else {
      loadData2()
    }
  }, [site])

  useEffect(() => {
    if (!change){
      if (filter1){
        filtr(site,page)
      }
      else {
        filter(page)
      }
    }
  }, [page])

  useEffect(() => {
    if (selectedSite) {
      getAverage(selectedSite._id)
    }
  }, [selectedSite])

  const fetchRoute = async (origin, destination) => {
    setRouteCoordinates([]);
    if (!origin || !destination) {
      return showAlert('There is no origin point. Please click on the map to select one or use your location.', 'error');
    }
  
    showAlert('', 'loading');
  
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
  
      if (data.routes && data.routes.length > 0) {
        hideAlert();
        const newRoute = data.routes[0].geometry.coordinates.map(([longitude, latitude]) => ({
          latitude,
          longitude,
        }));
        setRouteCoordinates(newRoute);
      } else {
        showAlert('No routes found', 'error');
        console.error('No se encontraron rutas');
      }
    } catch (error) {
      hideAlert();
      console.error('Error al obtener la ruta:', error);
    }
  };

    return(
        <View style={styles.container}>
          <View style={styles.search}>          
            <TextInput placeholder='Search' style={styles.searchContent} on onChangeText={(text) => setSearch(text)}/>
            <AntDesign name="search1" size={24} color="grey" style={{
              marginRight:15,
            }} onPress={() => searchData()} />
            <Pressable style={styles.refresh}>
              <AntDesign name="reload1" size={24} color="black" onPress={() => loadData2()} />
            </Pressable>
          </View>
          <View style={[styles.location, {backgroundColor:theme.bg1}]}>
            <Pressable onPress={() => getUserLocation()} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
              <Text style={{color:theme.title}}>Set origin</Text>
              <Entypo name="location-pin" size={24} color={theme.title} />
            </Pressable>
          </View>
          <View style={{position:'absolute',flexDirection:'row', justifyContent:'space-between', margin:'5%', padding:'2%', backgroundColor:theme.bg2, top:'93%', zIndex:1, width:'100%'}}>
            <Text style={{fontWeight:'bold', color: theme.title}}>Turismap</Text>
            <Image 
              source={require('../../assets/icon.png')}
              style={{width:25, height:25}}
            />
          </View>
          { logged && (
            <View style={[styles.filter, {backgroundColor:theme.bg1}]}>
              <Pressable onPress={() => {filter(1)}} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                <AntDesign name="question" size={24} color={theme.title} />
                <Text style={{color:theme.title}}>You may like these places</Text>
              </Pressable>
            </View>
          )}
          { filtered && (
            <>
              <View style={[styles.card, {backgroundColor: theme.bg1}]}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                  <Text style={{color: theme.title, fontSize:25, fontWeight:'bold'}}>
                    Exploring sites
                  </Text>
                  <Pressable onPress={() => loadData2()}>
                    <AntDesign name="close" size={24} color="red" />
                  </Pressable>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', marginLeft: '30%', marginRight:'30%'}}>
                    <Pressable onPress={() => {setPage(page-1)}}>
                      {page !== 1 && !isLoading && (
                          <AntDesign name="caretleft" size={24} color="black" />
                      )}
                    </Pressable>
                  <Text>
                    {page} - {maxPage}
                  </Text>
                    <Pressable onPress={() => {setPage(page+1)}}>
                      {maxPage !== page && !isLoading && (
                        <AntDesign name="caretright" size={24} color={theme.title} />
                      )}
                    </Pressable>
                </View>
                <FlatList
                  data={DATA}
                  renderItem={({ item }) => (
                    <View style={{padding: '2%', margin:'5%', backgroundColor:theme.bg2, borderRadius:15}}>
                      <Text style={{color: theme.title, fontWeight:'bold'}}>{item.nombreSitiosTuristicos}</Text>
                      <View>
                        <FlatList
                          data={stars}
                          renderItem={({ item, index }) => (
                              <AntDesign
                                name={index < reseña ? "star" : "staro"}
                                size={24}
                                color="#d4af37"
                              />
                          )}
                          keyExtractor={(item) => item.id}
                          numColumns={5}
                        />
                      </View>                        
                      <View style={{justifyContent:'center', alignItems:'center'}}>
                        {image && (
                            <Image 
                              source={{ uri: image }} 
                              style={{ width: 200, height: 200, borderRadius:15 }} 
                              resizeMode="cover" 
                            />
                        )}
                      </View>
                      <View style={{justifyContent:'center'}}>
                        <Pressable onPress={() => navigation.navigate('Item',{site: item, image: image})}>
                          <Text style={{textAlign:'center', fontSize:18, margin:'5%', color: theme.title}}>See more...</Text>
                        </Pressable>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item) => item._id}
                />
              </View>
            </>
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
            toolbarEnabled={false}
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
              onPress={() => setSelectedSite(sitio)}
              image={getIconForType(sitio.tipoSitiosTuristicos)}
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
              <Text style={[{textAlign:'center',margin:'2%',color: theme.text}]}>{selectedSite.descripcionSitiosTuristicos}</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <FlatList
                data={stars}
                renderItem={({ item, index }) => (
                    <AntDesign
                    name={index < reseña ? "star" : "staro"}
                    size={24}
                    color="#d4af37"
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={5}
              />
              </View>
              <Pressable onPress={() => navigation.navigate('Item',{site: selectedSite, image: image, logged: logged, id: _id})}>
                <Text style={{textAlign:'center', fontSize:18, margin:'5%', color: theme.title}}>See more...</Text>
              </Pressable>
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
            contentContainerStyle={{
              backgroundColor: theme.bg2, 
              borderRadius: 10,
            }}
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
    location: {
      position:'absolute',
      zIndex:1,
      left:'73%',
      marginTop:'15%',
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
    card: {
      position:'absolute',
      zIndex:1,
      top: '65%',
      width:'100%',
      height:'35%',
      borderRadius:30,
      padding:15
    }
})
export default HomeScreen;