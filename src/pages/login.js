import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const user = await auth().signInWithEmailAndPassword(username, password);
            console.log(user);
            navigation.navigate('Home', { userId: user.user.uid });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.TextInput}
                placeholder="Nome de usuário"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Entrar" color="#2E2E2E" onPress={login} />

            <Text style={styles.title}>Não possui uma conta?</Text>
            <Button title="Cadastrar" color="#2E2E2E" onPress={() => navigation.navigate('Cadastro')} />
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
})


export default Login