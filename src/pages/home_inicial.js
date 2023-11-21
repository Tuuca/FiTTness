import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const HomeInicial = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
            FiTTness
            </Text>
            <Text style={styles.text}>
                Não possui conta? <Text style={styles.link} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text>
            </Text>
            <Text style={styles.text}>
                Já possui conta? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Faça login</Text>
            </Text>
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
        textAlign: 'center',
        margin: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    title: {
    
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    }

});



export default HomeInicial