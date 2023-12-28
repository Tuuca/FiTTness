import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Modal, TextInput } from 'react-native';
import BottomBar from '../components/bottombar';
import auth from '@react-native-firebase/auth';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import styles from './styles';

const Perfil = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPeso, setModalPeso] = useState(false);
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
            const userId = auth().currentUser.uid;
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
    }, []);

    const AtualizacaoPeso = async () => {
        try {
            const userId = auth().currentUser.uid;
            const docRef = doc(db, 'users', userId);
            const updatedData = {
                peso: Number(editedPeso),
            };

            console.log('Novo Peso:', editedPeso);
            await addDoc(collection(db, 'peso'), {
                peso: Number(editedPeso),
                userId: userId,
                timestamp: new Date(),
            });

            await updateDoc(docRef, updatedData);
            setModalPeso(false);
            await getUser();
            console.log('Perfil atualizado com sucesso!');
            console.log('Entrada de peso adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const userId = auth().currentUser.uid;
            const docRef = doc(db, 'users', userId);
            const updatedData = {
                nome: editedNome,
                idade: Number(editedIdade),
                altura: Number(editedAltura),
                peso: Number(editedPeso),
                sexo: editedSexo,
            };

            await updateDoc(docRef, updatedData);
            setModalVisible(false);
            await getUser();
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
                <Text style={styles.text}>{editedNome ? `${editedNome}` : userData.nome}</Text>

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
                    style={styles.button}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{ color: 'white' }}>Editar informações</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalPeso(true)}
                >
                    <Text style={{ color: 'white' }}>Atualizar peso</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('HistoricoPeso')}
                >
                    <Text style={{ color: 'white' }}>Histórico de peso</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('HistoricoCalorias')}
                >
                    <Text style={{ color: 'white' }}>Histórico de calorias</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Editar Perfil</Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Nome"
                        placeholderTextColor="black"
                        value={editedNome}
                        onChangeText={(text) => setEditedNome(text)}
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Idade"
                        placeholderTextColor="black"
                        value={editedIdade}
                        onChangeText={(text) => setEditedIdade(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Altura"
                        placeholderTextColor="black"
                        value={editedAltura}
                        onChangeText={(text) => setEditedAltura(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Sexo"
                        placeholderTextColor="black"
                        value={editedSexo}
                        onChangeText={(text) => setEditedSexo(text)}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleUpdateProfile}
                    >
                        <Text style={styles.buttonText}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                visible={modalPeso}
                onRequestClose={() => setModalPeso(false)}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Cadastro de Peso</Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Peso"
                        placeholderTextColor="black"
                        value={editedPeso}
                        onChangeText={(text) => setEditedPeso(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={AtualizacaoPeso}
                    >
                        <Text style={styles.text}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalPeso(false)}
                    >
                        <Text style={styles.text}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <BottomBar navigation={navigation} />
        </View>
    );
};

export default Perfil;
