import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';

const Login = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const user = await auth().signInWithEmailAndPassword(username, password);
            console.log(user);
            navigation.navigate('Home', { isLogged: true });
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

            <Pressable title="Entrar" onPress={login} style={styles.button}>
                <Text style={styles.text}>Entrar</Text>
            </Pressable>

            <Text style={styles.text}>Não possui uma conta?</Text>

            {/* <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} style={styles.button} />*/}

            <Pressable title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} style={styles.button}>
                <Text style={styles.text}>Cadastrar</Text>
            </Pressable>

        </View>
    );
};

export default Login;