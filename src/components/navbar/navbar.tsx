import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';
import Icon from 'react-native-ico-material-design';

const iconHeight = 26;
const iconWidth = 26;

interface State {
    screenText: string;
}

export default class Navbar extends React.Component<{}, State> {
    state: State = {
        screenText: 'Press a button!',
    };

    changeText = (text: string) => {
        console.log(text + ' has been pressed');
        this.setState({
            screenText: text,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 30, color: 'white' }}> </Text>
                <StatusBar style="light" />

                <View style={styles.content}>
                    {/* Conteúdo principal da tela */}
                </View>

                <View style={styles.NavContainer}>
                    <View style={styles.NavBar}>
                        <Pressable
                            onPress={() => this.changeText('Favoritos')}
                            android_ripple={{ borderless: true, radius: 50 }}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? '#ddd' : '#fff',
                                },
                                styles.IconBehave,
                            ]}
                        >
                            <Icon name="favorite-heart-button" height={iconHeight} width={iconWidth} color="#448aff" />
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3962FF',
    },
    content: {
        flex: 1,
        width: '100%',
        paddingBottom: 50, // Empurra o conteúdo principal para cima
    },
    NavContainer: {
        position: 'absolute', // Fixa a navbar na parte inferior da tela
        alignItems: 'center',
        bottom: 0, // Fixa a navbar na parte inferior da tela
        width: '100%',
    },
    NavBar: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        width: '90%',
        justifyContent: 'space-evenly',
        borderRadius: 40,
    },
    IconBehave: {
        padding: 14,
    },
});