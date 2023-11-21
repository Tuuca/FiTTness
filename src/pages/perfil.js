import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Modal, TextInput } from 'react-native';
import BottomBar from '../components/bottombar';
import auth from '@react-native-firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const userId = auth().currentUser.uid;

const Perfil = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editedNome, setEditedNome] = useState('');
    const [editedIdade, setEditedIdade] = useState('');
    const [editedAltura, setEditedAltura] = useState('');
    const [editedPeso, setEditedPeso] = useState('');
    const [editedSexo, setEditedSexo] = useState('');
    const [userData, setUserData] = useState({
        nome: '',
        idade: '',
        altura: '',
        peso: '',
        sexo: '',
    });

    useEffect(() => {
        const getUser = async () => {
            const docRef = doc(db, 'users', userId);
            const user = await getDoc(docRef);

            if (user.exists()) {
                console.log("Document data:", user.data());
                setUserData(user.data());
            } else {
                console.log("No such document!");
            }
        };

        getUser();
    }, []); // O segundo argumento vazio significa que o efeito será executado apenas uma vez, semelhante ao componentDidMount

    const handleUpdateProfile = async () => {
        const docRef = doc(db, 'users', userId);
        const updatedData = {
            nome: editedNome,
            idade: Number(editedIdade),
            altura: Number(editedAltura),
            peso: Number(editedPeso),
            sexo: editedSexo,
        };

        try {
            await updateDoc(docRef, updatedData);
            setModalVisible(false);
            getUser();
            console.log('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Image
                    style={styles.profileImage}
                    source={require('../image/profile.png')}
                />
                <Text style={styles.userName}>{editedNome ? `${editedNome}` : userData.nome}</Text>

                <View style={styles.gridRow}>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoLabel}>Idade:</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}> {editedIdade ? `${editedIdade}` : userData.idade} Anos</Text>
                    </View>
                </View>
                <View style={styles.gridRow}>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoLabel}>Altura</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}>{editedAltura ? `${editedAltura}` : userData.altura}cm</Text>
                    </View>
                </View>
                <View style={styles.gridRow}>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoLabel}>Peso</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}>{editedPeso ? `${editedPeso}` : userData.peso}kg</Text>
                    </View>
                </View>
                <View style={styles.gridRow}>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoLabel}>Sexo</Text>
                    </View>
                    <View style={styles.gridItem}>
                        <Text style={styles.infoText}>{editedSexo ? `${editedSexo}` : userData.sexo} </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{ color: 'white' }}>Editar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Editar Perfil</Text>
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Nome"
                        placeholderTextColor="black"
                        value={editedNome}
                        onChangeText={(text) => setEditedNome(text)}
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Idade"
                        placeholderTextColor="black"
                        value={editedIdade}
                        onChangeText={(text) => setEditedIdade(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Altura"
                        placeholderTextColor="black"
                        value={editedAltura}
                        onChangeText={(text) => setEditedAltura(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Peso"
                        placeholderTextColor="black"
                        value={editedPeso}
                        onChangeText={(text) => setEditedPeso(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Sexo"
                        placeholderTextColor="black"
                        value={editedSexo}
                        onChangeText={(text) => setEditedSexo(text)}
                    />
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleUpdateProfile}
                    >
                        <Text style={styles.buttonText}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

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
    infoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 300,
        height: 400,
        padding: 10,
    },
    profileImage: {
        width: '50%',
        height: '50%',
        borderRadius: 100,
        marginBottom: 10,  // Adicionado marginBottom para ajustar a posição
    },
    userName: {
        color: 'white',
        marginBottom: 10,  // Adicionado marginBottom para ajustar a posição
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2,
    },
    gridItem: {
        flex: 1,
        backgroundColor: '#2E2E2E',
        padding: 10,
        marginHorizontal: 1,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: 'white',
    },
    infoText: {
        color: 'white',
    },


    gridRowBaixo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2,
    },
    gridItemBaixo: {
        flex: 1,
        backgroundColor: '#2E2E2E',
        padding: 10,
        marginHorizontal: 1,
    },


    title: {
        fontStyle: 'Century Gothic',
        fontSize: 55,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },
    Button: {
        backgroundColor: '#62626E',
        width: 100,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        color: 'black',
    },
    modalInput: {
        width: '80%',
        height: 40,
        color: 'black',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Perfil;
