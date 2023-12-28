import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Button, Pressable } from 'react-native'
import styles from './styles';

const HomeInicial = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                FiTTness
            </Text>

            <Text style={styles.text}>
                Não possui conta?
            </Text>

            <Pressable title="Cadastro" onPress={() => navigation.navigate('Cadastro')} style={styles.button}>
                <Text style={styles.text}>Cadastro</Text>
            </Pressable>

            <Text style={styles.text}>
                Já possui conta?
            </Text>
            
            <Pressable title="Login" onPress={() => navigation.navigate('Login')} style={styles.button}>
                <Text style={styles.text}>Login</Text>
            </Pressable>

        </View>

    );
};

export default HomeInicial