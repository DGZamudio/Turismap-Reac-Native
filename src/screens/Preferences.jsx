import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import themeContext from '../theme/themeContext'
import { ScrollView } from 'react-native-gesture-handler';
import { updateData } from '../services/api';
import { useAlert } from './Alert';
import { CommonActions } from '@react-navigation/native';

const Preferences = ({ route, navigation }) => {
    const theme = useContext(themeContext);
    const { data } = route.params;
    const [_id] = useState(data.user_id)
    const { showAlert } = useAlert()
    const [selectedItems, setSelectedItems] = useState(new Set());

    const options = [
        { id:"1", title:'Historical Heritage', image: require('../../assets/HGP.jpg')},
        { id:"2", title:'Art', image: require('../../assets/ArtP.jpg')},
        { id:"3", title:'Museums and galleries', image: require('../../assets/MuseumP.jpg')},
        { id:"4", title:'Literature', image: require('../../assets/LiteratureP.jpg')},
        { id:"5", title:'Performing arts', image: require('../../assets/Art2P.jpg')},
        { id:"6", title:'Iconic places', image: require('../../assets/IconicP.jpg')}
    ]

    const toggleSelection = (id) => {
        setSelectedItems(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    };

    const renderItem = ({item}) => (        
        <Pressable style={[styles.preferences, selectedItems.has(item.id) && styles.selected]} onPress={() => toggleSelection(item.id)}>
            <Image source={item.image} style={styles.img}/>
            <Text style={[styles.text, {color: theme.text}]}>
                {item.title}
            </Text>
        </Pressable>
    );

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.bg1}]}>
        <View style={[styles.card, {backgroundColor: theme.bg2}]}>
            <Text style={[styles.title, {color: theme.title}]}>User Preferences</Text>
            <View>
                <FlatList
                    data={options}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                />
            </View>
            <Pressable 
                style={[styles.button, {backgroundColor: theme.title}]} 
                onPress={() => {
                    showAlert('', 'loading')
                    updateData(`/addpre/${_id}`, {preferencias:[...selectedItems]})
                    .then((data) => {
                        showAlert('Preferences set correctly', 'success');
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Redirect' }],
                            })
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        showAlert('there was an error trying to set your preferences try againg', 'error');
                    })
                }}
            >
                <Text style={[styles.title, {color: theme.bg1}]}>Set Preferences</Text>
            </Pressable>
            <Pressable style={[styles.button]} onPress={() => navigation.navigate('Home')}>
                <Text style={[styles.title, {color: theme.title}]}>Not now</Text>
            </Pressable>
        </View>
    </ScrollView>
  )
}

export default Preferences

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%'
    },
    card: {
        flex:1,
        marginTop:'20%',
        margin:'10%',
        padding:'5%',
        borderRadius:15,
    },
    title:{
        textAlign:'center',
        fontWeight:'bold'
    },
    text:{
        textAlign:'center',
    },
    img:{
        width:70,
        height:70,
        borderRadius:50,
    },
    preferences: {
        flex: 1,
        margin: 8,
        alignItems:'center'
    },
    selected: {
        flex: 1,
        margin: 8,
        alignItems:'center',
        opacity: 0.5
    },
    button: {
        margin:'15%',
        height:'10%',
        borderRadius: 30,
        overflow: 'hidden',
        justifyContent:'center',
    }
})