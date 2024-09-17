import { StyleSheet, Text, View, ScrollView, FlatList, Pressable, TextInput, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import themeContext from '../theme/themeContext';
import { useAlert } from './Alert';
import { getData, sendData } from '../services/api';

const Item = ({ navigation, route }) => {
    const { site, image, logged, id } = route.params || {};
    const { showAlert, hideAlert } = useAlert()
    const theme = useContext(themeContext)
    const [selectedStars, setSelectedStars] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [image1, setImage1] = useState("");
    const [comments, setComments] = useState([]);
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
    const [reseña, setReseña] = useState(0)

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

    const getAverage = (id) => {
      getData(`/average-site-rating/${id}`)
      .then((data) => {
        setReseña(data.Promedio)
      })
      .catch((error) => {
        console.error(error)
        showAlert('The was an erorr uploading the review', 'error')
      })
    }

    const getComments = (id) => {
      getData(`/calificaciones_sitio/${id}`)
      .then((data) => {
        setComments(data.resultados)
      })
      .catch((error) => {
        console.error(error)
        showAlert('The was an erorr uploading the review', 'error')
      })
    }
  
    const sendComment = () => {
      showAlert('','loading')
      sendData('/calificar', {usuario_id:id, sitioturistico_id:site._id, calificacion:selectedStars, comentario: reviewComment})
      .then((data) => {
        if (data.mensaje === 'Calificación registrada con éxito') {
          showAlert('The review was succesfully created', 'success')
        }
        else {
          showAlert('The was an erorr uploading the review', 'error')
        }
      })
      .catch((error) => {
        console.error(error)
        showAlert('The was an erorr uploading the review', 'error')
      })
    }

    useEffect(() => {
      if (site) {
        getAverage(site._id)
        getComments(site._id)
      }
    }, [site])

    useEffect(() => {
      if(!image) {
        getImage(site._id)
      }
    }, [image])

  return (
    <>
    <View style={{justifyContent:'flex-start',paddingTop:'10%', paddingLeft:'3%', backgroundColor: theme.bg2}}>
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
            <View style={{justifyContent:'center',alignItems:'center', padding:'5%',margin:'5%', backgroundColor: theme.bg1, borderRadius:43}}>
              {image || image1 ? (
                <Image source={{ uri: image ? image : image1 }} style={{ width: 200, height: 200, borderRadius:15 }} />
              ) : ( 
                <Text>No image available</Text>
              )}
            </View>
            <Text style={[styles.desc, {color: theme.text}]}>{site.descripcionSitiosTuristicos}</Text>
            {comments && (
              <View style= {{margin: '5%'}}>
                <FlatList
                  data={comments}
                  renderItem={({ item }) => (
                    <View style={[styles.review, { backgroundColor: theme.bg3 }]}>
                      <Text style={{color: theme.title, fontSize:15, fontWeight: 'bold'}}>{item.nombreUsuario}</Text>
                      <View style={{flexDirection:'row'}}>
                      {stars.map((_, index) => (
                        <AntDesign
                          name={index < item.calificacion ? "star" : "staro"}
                          size={24}
                          color="#d4af37"
                        />
                      ))}
                      </View>
                      <Text style={[styles.desc, {color: theme.text}]}>{item.comentario}</Text>
                    </View>
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: '2%' }} />}
                />
              </View>
            )}
            {logged && (
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
              <TextInput style={[styles.input, {backgroundColor:theme.bg1, color: theme.text}]} placeholder="Comment (Optional)" placeholderTextColor={theme.text} value={reviewComment} onChangeText={(text) => setReviewComment(text)} />
              <Pressable style={styles.button}>
                <Text style={{color: '#FFF'}} onPress={() => {
                  sendComment()
                }}>
                  Send Review
                </Text>
              </Pressable>
            </View>
            )}
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
    },
    review: {
      padding: 5,
      maring: '5%',
      borderRadius:10
    }
})