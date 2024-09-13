import { StyleSheet, Text, View, Image, ScrollView, Dimensions, FlatList, Pressable } from 'react-native'
import React, { useContext, useRef, useEffect, useState } from 'react'
import { getData as Get } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import themeContext from '../theme/themeContext'

    const { width } = Dimensions.get('window');
    const data = [
        { id:"1", title:'Historical Heritage', image: require('../../assets/HGP.jpg')},
        { id:"2", title:'Art', image: require('../../assets/ArtP.jpg')},
        { id:"3", title:'Museums and galleries', image: require('../../assets/MuseumP.jpg')},
        { id:"4", title:'Literature', image: require('../../assets/LiteratureP.jpg')},
        { id:"5", title:'Performing arts', image: require('../../assets/Art2P.jpg')},
        { id:"6", title:'Iconic places', image: require('../../assets/IconicP.jpg')}
    ];

const Dashboard = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [sitesData, setSitesData] = useState([]);
    const [showUB, setShowUB] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [logged, setLogged] = useState(false);
    const theme = useContext(themeContext)
    const flatListRef = useRef(null);

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
          setLogged(false);
        }
      };

      const loadData = (id) => {
        Get(`/filter/${id}?page=${page}&per_page=${perPage}`)
        .then((data) => {
            setSitesData(data.data);
            setTotalPages(data.total_pages);
        })
      }

      const handlePress = (id) => {
        let sid = Array.of(id)
        navigation.navigate('Map', {site: sid})
      }

    useEffect(() => {
    getData();
    }, []);

    useEffect(() => {
        if (logged) {
            loadData(userData.sub.user_id)
        }
      }, [page]);

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.bg1}]}>
        <View style={[styles.header, {borderColor: theme.text, backgroundColor: theme.bg2}]}>
            <Text style={[styles.title, {color: theme.title}]}>Turismap</Text>
            <Image source={require('../../assets/icon.png')} resizeMode="contain" style={styles.logo}/>
        </View>
        <View style={styles.body}>
            <View>
                <Text style={[styles.title, {color: theme.title, textAlign:'center'}]}>Explore</Text>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handlePress(item.id)}>
                            <View style={[styles.slide, {backgroundColor: theme.bg2}]}>
                                <Image source={ item.image } style={styles.image} />
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                        </Pressable>
                    )}
                />
            </View>
            <View>
                <Text style={[styles.title, {color: theme.title, textAlign:'center'}]}>Explore</Text>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={[styles.slide, {backgroundColor: theme.bg2}]}>
                            <Image source={ item.image } style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.end}>
                <Pressable style={[styles.button, {backgroundColor: theme.title}]} onPress={() => navigation.navigate('Map')}>
                    <Text style={[styles.buttonText, {color: theme.bg1}]}>Go to the map</Text>
                </Pressable>
            </View>
        </View>
    </ScrollView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    title: {
        fontSize:20,
        fontWeight:'bold'
    },
    logo: {
        width: 60,
        height: 60,
        aspectRatio: 1,
    },
    header: {
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingBottom:'3',
        borderBottomWidth: 0.5,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    body: {
        margin:'5%'
    },
    slide: {
        width: width - 60,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 20,
        padding: 15,
        margin: '2%'
    },
    image: {
        width: '100%',
        height: 175,
        borderRadius: 10,
    },
    button: {
        width:'80%',
        padding:'5%',
        borderRadius: 30,
        overflow: 'hidden',
    },
    buttonText: {
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    end: {
        margin:'5%',
        alignItems:'center'
    }
})