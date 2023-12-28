import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { db } from '../services/firebaseConfig';
import auth from '@react-native-firebase/auth';
import { setDoc, doc } from "firebase/firestore";

const Cadastro = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [sexo, setSexo] = useState('');

    function cadastrar() {
        auth()
            .createUserWithEmailAndPassword(username, password)
            .then(async (response) => {
                const uid = response.user.uid;
                const data = {
                    username,
                    nome,
                    idade,
                    peso,
                    altura,
                    sexo,
                };

                const usersRef = await setDoc(doc(db, 'users', uid), data);
                navigation.navigate('Login');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('Esse endereço de e-mail já está em uso!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('Endereço de e-mail inválido!');
                }

                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="black"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Senha"
                placeholderTextColor="black"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Nome"
                placeholderTextColor="black"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Idade"
                placeholderTextColor="black"
                value={idade}
                onChangeText={text => setIdade(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Peso"
                placeholderTextColor="black"
                value={peso}
                onChangeText={text => setPeso(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Altura"
                placeholderTextColor="black"
                value={altura}
                onChangeText={text => setAltura(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Sexo"
                placeholderTextColor="black"
                value={sexo}
                onChangeText={setSexo}
            />

            <Button title="Criar conta" color="#2E2E2E" onPress={cadastrar} />

            <Text style={styles.title}>Já possui uma conta?</Text>
            <Button title="Login" color="#2E2E2E" onPress={() => navigation.navigate('Login')} />
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
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },
    TextInput: {
        width: '80%',
        height: 40,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,

    },
});

export default Cadastro;
