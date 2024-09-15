import { StyleSheet, Text, View, Image, ScrollView, Dimensions, FlatList, Pressable } from 'react-native'
import React, { useContext, useRef, useEffect, useState } from 'react'
import themeContext from '../theme/themeContext'
import { getData } from '../services/api';

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
    const [sitesData, setSitesData] = useState([]);
    const [showUB, setShowUB] = useState(false);
    const theme = useContext(themeContext)
    const flatListRef = useRef(null);


    const loadData = () => {
        getData(`/last`)
          .then((data) => {
            const updatedData = data.map((item) => ({
              ...item,
              image: `data:image/jpeg;base64,${item.image}` 
            }));
            setSitesData(updatedData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };
      

      const handlePress = (id) => {
        let sid = Array.of(id)
        navigation.navigate('Map', {site: sid})
      }

    useEffect(() => {
        loadData();
    }, []);

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
                    data={sitesData}
                    keyExtractor={(item) => item._id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={[styles.slide, {backgroundColor: theme.bg2}]}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.title}>{item.nombreSitiosTuristicos}</Text>
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
        width: 200,
        height: 200,
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