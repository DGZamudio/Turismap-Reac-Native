import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.Text}>
            <Text>Hola Mundo! 👻</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    Text: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default HomeScreen;