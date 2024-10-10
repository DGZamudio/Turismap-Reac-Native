import React, { useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';

const Eventos = () => {
  const [cards] = useState([
    { id: 0, title: 'Card 1', text: 'Some quick example text for card 1', image: 'https://via.placeholder.com/150' },
    { id: 1, title: 'Card 2', text: 'Some quick example text for card 2', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Card 3', text: 'Some quick example text for card 3', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Card 4', text: 'Some quick example text for card 4', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Card 5', text: 'Some quick example text for card 5', image: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Card 6', text: 'Some quick example text for card 6', image: 'https://via.placeholder.com/150' }
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardText}>{item.text}</Text>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Go somewhere</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardsContainer}
      />
      <View style={styles.actions}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Prev</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    marginBottom: 20,
  },
  card: {
    width: 180,
    height: 280,
    backgroundColor: '#9d7cce',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden', // Added to keep image within bounds
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
  },
  btn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Eventos;
