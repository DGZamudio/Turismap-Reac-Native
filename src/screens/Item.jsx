import { StyleSheet, Text, View, ScrollView, FlatList, Pressable, TextInput, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import themeContext from '../theme/themeContext';

const Item = ({ navigation, route }) => {
    const { site, image } = route.params || {};
    const theme = useContext(themeContext)
    const [selectedStars, setSelectedStars] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [image1, setImage1] = useState("")
    const stars = [
        {id: '1'},
        {id: '2'},
        {id: '3'},
        {id: '4'},
        {id: '5'}
      ]
    const seleccionarEstrella = (index) => {
    setSelectedStars(index + 1);
    };
    const reseña = '1'

    const getImage = (id) => {
      setImage1("")
      fetch(`https://turismap-backend-python.onrender.com/get_image/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener la imagen");
        }
        return response.text(); 
      })
      .then((base64String) => {
        const imageSrc = `data:image/jpeg;base64,${base64String}`; 
        setImage1(imageSrc); 
      })
      .catch((error) => {
        console.error(error); 
      });
    }

    useEffect(() => {
      if(!image) {
        getImage(site._id)
      }
    }, [image])

  return (
    <>
    <View style={{justifyContent:'flex-start',marginTop:'10%', marginLeft:'3%'}}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="back" size={24} color={theme.title} />
      </Pressable>
    </View>
    <ScrollView style={[styles.container, {backgroundColor:theme.bg2}]}>
        <View>
            <Text style={[styles.title, {color: theme.title}]}>{site.nombreSitiosTuristicos}</Text>
            <Text style={{color: theme.text}}>{site.horariosSitiosTuristicos}</Text>
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
            <View style={{justifyContent:'cneter',alignItems:'center', padding:'5%',margin:'5%', backgroundColor: theme.bg1, borderRadius:43}}>
              {image || image1 ? (
                <Image source={{ uri: image ? image : image1 }} style={{ width: 200, height: 200, borderRadius:15 }} />
              ) : ( 
                <Text>No image available</Text>
              )}
            </View>
            <Text style={[styles.desc, {color: theme.text}]}>{site.descripcionSitiosTuristicos}</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: '15%'}}>
                <Text style={{color: theme.text}}>Give us your opinion</Text>
                <FlatList
                  data={stars}
                  renderItem={({ item, index }) => (
                    <>
                        <Pressable onPress={() => seleccionarEstrella(index)}>
                        <AntDesign
                            name={index < selectedStars ? "star" : "staro"}
                            size={24}
                            color="#d4af37"
                        />
                        </Pressable>
                    </>
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={5}
                />
                <TextInput style={[styles.input, {backgroundColor:theme.bg1}]} placeholder="Comment (Optional)" placeholderTextColor={theme.text} value={reviewComment} onChangeText={(text) => setReviewComment(text)} />
                <Pressable style={styles.button}>
                  <Text style={{color: '#FFF'}}>
                    Send Review
                  </Text>
                </Pressable>
              </View>
        </View>
    </ScrollView>
    </>
  )
}

export default Item

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:'5%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    desc: {
        marginTop:'5%',
        fontSize: 15,
    },
    input: {
      borderRadius:15,
      padding:5,
      height:180,
      width:280
    },
    button: {
      margin:'5%',
      borderRadius:15,
      padding:'5%',
      backgroundColor:'#1E90FF'
    }
})