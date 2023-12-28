import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import BottomBar from '../components/bottombar';
import auth from '@react-native-firebase/auth';

const logout = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}

export default function Logout({ navigation }) {
    logout();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Você saiu da sua conta!
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

    },
    text: {
        fontSize: 20,
        fontStyle: 'Century Gothic',
        textAlign: 'center',
        margin: 10,
    },

    title: {
        fontStyle: 'Century Gothic',
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    }

});
