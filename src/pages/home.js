import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import BottomBar from '../components/bottombar';
import auth from '@react-native-firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import styles from './styles';

const Home = ({ navigation }) => {
    const [nome, setNome] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const userId = auth().currentUser.uid;
            const docRef = doc(db, 'users', userId);
            try {
                const user = await getDoc(docRef);
                if (user.exists()) {
                    console.log('Document data:', user.data());
                    const userNome = user.data().nome;
                    setNome(userNome);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        getUser();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Você está logado! FiTTness!
                Bem-vindo {nome}
            </Text>
            <BottomBar navigation={navigation} />
        </View>
    );
};

export default Home;
