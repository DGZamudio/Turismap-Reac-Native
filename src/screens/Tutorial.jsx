import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'

const Tutorial = ({ navigation }) => {
  return (
    <ScrollView >
        <View style={styles.container}>
            <Image
                source={require('../../assets/icon.png')}
                style={{ width: 150, height: 150 }}
            />
            <Text style={styles.title}>
                Turismap
            </Text>
            <View style={styles.card}>
                <Text style={styles.title2}>
                    ¡Welcome to Turismap!
                </Text>
                <Text style={styles.text}>
                    In this app we want to make turism in la Candelaria, Bogota a very joyful experience by giving you recommended places to visit, giving you interactive routes ¡and much more! 
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.title2}>
                    What is La Candelaria?
                </Text>
                <Text style={styles.text}>
                    La Candelaria is the historic center of Bogotá, Colombia, known for its cobblestone streets, colorful colonial architecture, and vibrant cultural scene. It’s home to key landmarks like Plaza de Bolívar and the Gold Museum, as well as art galleries, cafés, and street performances. With its rich history and lively atmosphere, La Candelaria offers a unique insight into Bogotá’s cultural heritage.
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.title2}>
                    Principal functions of the app (Not logged)
                </Text>
                <View style={[styles.card, {backgroundColor: '#F2F2F2'}]}>
                    <View style={[styles.card, {borderWidth:3, borderColor:'#E0E0E0' ,backgroundColor: '#FFF'}]}>
                        <Text style={styles.title2}>
                            View every site
                        </Text>
                        <Text style={styles.text}>
                            If you want to see all the aviable points in the map the only thing you have to do is to acces the map once you enter to the map with no extra instructions every aviable point will load
                        </Text>
                        <Image />
                        <Text style={styles.text}>
                            Also you can see all the sites by pressing this button
                        </Text>
                        <Image />
                    </View>
                    <View style={[styles.card, {borderWidth:3, borderColor:'#E0E0E0' ,backgroundColor: '#FFF'}]}>
                        <Text style={styles.title2}>
                            Search for a site
                        </Text>
                        <Text style={styles.text}>
                            If you want to search a site for his name or something about it you can do it by pressing the search button and inserting the name of a site or something in his description
                        </Text>
                        <Image />
                    </View>
                    <View style={[styles.card, {borderWidth:3, borderColor:'#E0E0E0' ,backgroundColor: '#FFF'}]}>
                        <Text style={styles.title2}>
                            Basic filter for sites
                        </Text>
                        <Text style={styles.text}>
                            If you want to look for sites with special types you can do it in the home page by pressing one of the cards whit the type of sites you want to see
                        </Text>
                        <Image />
                    </View>
                    <View style={[styles.card, {borderWidth:3, borderColor:'#E0E0E0' ,backgroundColor: '#FFF'}]}>
                        <Text style={styles.title2}>
                            Routing
                        </Text>
                        <Text style={styles.text}>
                            If you want to know how to go to a place the only thing you have to do is to set a origin and a destination, if you want your origin to be your actual ubication you just have to press the set origin button
                        </Text>
                        <Image />
                        <Text style={styles.text}>
                            But if you want to set an alternative location you just have to press the map in the location you want to set your origin
                        </Text>
                        <Image />
                        <Text style={styles.text}>
                            Once you set your origin point you have to select a destination and to do that you need to press one of the sites in the map and click the select destination button
                        </Text>
                        <Image />
                        <Text style={styles.text}>
                            Once you do all the procces the destination should be marked in the map
                        </Text>
                        <Image />
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.title2}>
                    Logged functions
                </Text>
                <View style={[styles.card, {backgroundColor: '#F2F2F2'}]}>
                    <View style={[styles.card, {borderWidth:3, borderColor:'#E0E0E0' ,backgroundColor: '#FFF'}]}>
                        <Text style={styles.title2}>
                            Filter sites by preferences
                        </Text>
                        <Text style={styles.text}>
                            If you make an account in our app you are going to be able to set your preferences by accessing the set preferences view
                        </Text>
                        <Image />
                        <Text style={styles.text}>
                            Once you set your preferences and you are logged you are going to be able to use the function that will show you the sites with its interesant things
                        </Text>
                        <Image />
                    </View>
                    <View style={[styles.card, {borderWidth:3, borderColor:'#E0E0E0' ,backgroundColor: '#FFF'}]}>
                        <Text style={styles.title2}>
                            Reviews
                        </Text>
                        <Text style={styles.text}>
                            If you make an account in our app you are going to be able to make reviews to sites so other tourist can see what people think of the sites
                        </Text>
                        <Image />
                        <Text style={styles.text}>
                            To make a review you have to set a value in stars, 5 being the max once you do that you can make a comment if you want to
                        </Text>
                        <Image />
                    </View>
                    <View style={[styles.card, {borderWidth:3, borderColor:'#E0E0E0' ,backgroundColor: '#FFF'}]}>
                        <Text style={styles.title2}>
                            Edit profile
                        </Text>
                        <Text style={styles.text}>
                            If you want to change your password or user name you can do it inside the edit profile view
                        </Text>
                        <Image />
                    </View>
                </View>
 
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={[styles.title2, {color: '#FFF'}]}>
                    Let’s start
                </Text>
            </Pressable>
        </View>
    </ScrollView>
  )
}

export default Tutorial

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:'15%',
        backgroundColor:'#FFF'
    },
    button: {
        backgroundColor:'#101010',
        borderRadius:13,
        padding:'2%'
    },
    card: {
        padding:15,
        backgroundColor: '#F2F2F2',
        borderRadius: 25,
        marginBottom:'10%',
        justifyContent:'center',
        alignItems:'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        margin:'15%'
    },
    title2: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        margin:'5%'
    },
    text: {
        textAlign:'center'
    }
})