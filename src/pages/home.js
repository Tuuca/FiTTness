import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import BottomBar from '../components/bottombar';
import auth from '@react-native-firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig';

const userId = auth().currentUser.uid;

const getUser = async () => {
    console.log("getUser");
    const docRef = await doc(db, "users", userId);
    const user = await getDoc(docRef);

    if (user.exists()) {
        console.log("Document data:", user.data());
        nome = user.data().nome;
    } else {
        console.log("No such document!");
    }
}

getUser();

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Vc ta logado! FiTTness!
                bem vindo {nome}
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

export default Home;