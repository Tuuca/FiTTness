import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import BottomBar from '../components/bottombar';

const Dieta = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Dieta
            </Text>
            <BottomBar navigation={navigation} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5A94F2',

    },
    text: {
        fontSize: 20,
        fontStyle: 'Century Gothic',
        textAlign: 'center',
        margin: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    title: {
        fontStyle: 'Century Gothic',
        fontSize: 55,
        textAlign: 'center',
        margin: 10,
    }

});

export default Dieta;