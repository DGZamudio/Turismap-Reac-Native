import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 180;
const SPACING = 10;
const CENTER_SPACING = (width - CARD_WIDTH) / 2;

const Eventos = () => {
  const [cards] = useState([
    { id: 0, title: 'Card 1', description: 'Descripción', startDate: 'Fecha de inicio: 01/01/2024', endDate: 'Fecha de fin: 01/02/2024', image: 'https://via.placeholder.com/150' },
    { id: 1, title: 'Card 2', description: 'Descripción', startDate: 'Fecha de inicio: 01/02/2024', endDate: 'Fecha de fin: 01/03/2024', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Card 3', description: 'Descripción', startDate: 'Fecha de inicio: 01/03/2024', endDate: 'Fecha de fin: 01/04/2024', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Card 4', description: 'Descripción', startDate: 'Fecha de inicio: 01/04/2024', endDate: 'Fecha de fin: 01/05/2024', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Card 5', description: 'Descripción', startDate: 'Fecha de inicio: 01/05/2024', endDate: 'Fecha de fin: 01/06/2024', image: 'https://via.placeholder.com/150' },
    { id: 5, title: 'Card 6', description: 'Descripción', startDate: 'Fecha de inicio: 01/06/2024', endDate: 'Fecha de fin: 01/07/2024', image: 'https://via.placeholder.com/150' }
  ]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
      (index + 1) * (CARD_WIDTH + SPACING)
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp'
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
        <Image style={styles.cardImage} source={{ uri: item.image }} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardText}>{item.description}</Text>
          <Text style={styles.cardText}>{item.startDate}</Text>
          <Text style={styles.cardText}>{item.endDate}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Events</Text> 
      <Image
        source={{ uri: 'https://2.bp.blogspot.com/-6l_paC5jSAA/UUXd-ZujCPI/AAAAAAAAC2I/74BZTvZkKds/s1600/perro.gif' }}
        style={styles.gifImage} // Add this line
        resizeMode="contain" // Maintain aspect ratio
      />
      <Animated.FlatList
        ref={flatListRef}
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        contentContainerStyle={{
          paddingHorizontal: CENTER_SPACING,
          alignItems: 'center', // Center the cards vertically
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupy all available space
    backgroundColor: '#fff',
    justifyContent: 'center', // Center the cards vertically
    alignItems: 'center', // Center the cards horizontally
  },
  headerText: {
    fontSize: 24, // Size of the title
    fontWeight: 'bold', // Bold text
    color: '#333', // Text color
    marginVertical: 10, // Margin for spacing
  },
  card: {
    width: CARD_WIDTH,
    height: 280,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING / 2,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#333',
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
  gifImage: {
    width: width, // Set the width to occupy full screen
    height: 200, // Adjust height as needed
    marginVertical: 10, // Add vertical margin
  },
});

export default Eventos;
