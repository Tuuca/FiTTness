import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig';
import BottomBar from '../components/bottombar';
import auth from '@react-native-firebase/auth';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import styles from './styles';

const AlimentosCrud = () => {
    const navigation = useNavigation();
    const [alimentos, setAlimentos] = useState([]);
    const [nome, setNome] = useState('');
    const [calorias, setCalorias] = useState('');
    const [proteinas, setProteinas] = useState('');
    const [carboidratos, setCarboidratos] = useState('');
    const [gorduras, setGorduras] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAlimento, setSelectedAlimento] = useState(null);
    const [modalNome, setModalNome] = useState('');
    const [modalCalorias, setModalCalorias] = useState('');
    const [modalProteinas, setModalProteinas] = useState('');
    const [modalCarboidratos, setModalCarboidratos] = useState('');
    const [modalGorduras, setModalGorduras] = useState('');
    const [CodigoBarra, setCodigoBarra] = useState('');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [link, setLink] = useState('');
    const [isDataObtained, setIsDataObtained] = useState(false);
    const [shouldNavigateBack, setShouldNavigateBack] = useState(false);


    const userId = auth().currentUser.uid;

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'alimentos')
            , snapshot => {
                const listAlimentos = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
                    .filter(alimento => alimento.userId === userId);
                setAlimentos(listAlimentos);
            });
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        if (isCameraOpen && isDataObtained && shouldNavigateBack) {
            navigation.goBack();
        }
    }, [isCameraOpen, isDataObtained, shouldNavigateBack, navigation]);
    const navigateToScanner = () => {
        setIsDataObtained(false);
        navigation.navigate('ScannerScreen', { onBarcodeScan, setIsDataObtained });
    };

    const onBarcodeScan = ({ data }) => {
        setCodigoBarra(data);
        setIsCameraOpen(false);
    };
    function cadastrarAlimento() {
        const novoAlimento = {
            userId: userId,
            nome,
            calorias: Number(calorias),
            proteinas: Number(proteinas),
            carboidratos: Number(carboidratos),
            gorduras: Number(gorduras),
            CodigoBarra: CodigoBarra,
        };

        addDoc(collection(db, 'alimentos'), novoAlimento)
            .then(() => {
                setNome('');
                setCalorias('');
                setProteinas('');
                setCarboidratos('');
                setGorduras('');
                setCodigoBarra('');
            })
            .catch(error => {
                console.error('Erro ao cadastrar alimento:', error);
            });
    }

    function handleDelete(id) {
        deleteDoc(doc(db, 'alimentos', id))
            .then(() => {
                console.log('Alimento excluído com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao excluir alimento:', error);
            });
    }

    function handleUpdate() {
        const updatedAlimento = {
            nome: modalNome || selectedAlimento.nome,
            calorias: modalCalorias !== '' ? Number(modalCalorias) : selectedAlimento.calorias,
            proteinas: modalProteinas !== '' ? Number(modalProteinas) : selectedAlimento.proteinas,
            carboidratos: modalCarboidratos !== '' ? Number(modalCarboidratos) : selectedAlimento.carboidratos,
            gorduras: modalGorduras !== '' ? Number(modalGorduras) : selectedAlimento.gorduras,
        };

        updateDoc(doc(db, 'alimentos', selectedAlimento.id), updatedAlimento)
            .then(() => {
                console.log('Alimento atualizado com sucesso!');
                setModalVisible(false);
            })
            .catch(error => {
                console.error('Erro ao atualizar alimento:', error);
            });
    }

    function confirmDelete(id) {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir este alimento?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                { text: 'Confirmar', onPress: () => handleDelete(id) },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Alimento</Text>

            <TextInput
                style={styles.TextInput}
                placeholder="Nome"
                placeholderTextColor="black"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Calorias"
                placeholderTextColor="black"
                value={calorias}
                onChangeText={text => setCalorias(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Proteínas"
                placeholderTextColor="black"
                value={proteinas}
                onChangeText={text => setProteinas(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Carboidratos"
                placeholderTextColor="black"
                value={carboidratos}
                onChangeText={text => setCarboidratos(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Gorduras"
                placeholderTextColor="black"
                value={gorduras}
                onChangeText={text => setGorduras(text.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.TextInput}
                placeholder="Código de barras"
                placeholderTextColor="black"
                value={CodigoBarra}
                onChangeText={(text) => {
                    setCodigoBarra(text.replace(/[^0-9]/g, ''));
                    setShouldNavigateBack(true);
                }}
                keyboardType="numeric"
            />

            <Pressable style={styles.button} onPress={() => navigateToScanner()}>
                <Text style={styles.text}>Ler código de barras</Text>
            </Pressable>

            {isCameraOpen && !isDataObtained && (
                <QRCodeScanner
                    style={{ marginTop: 40 }}
                    onRead={onBarcodeScan}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    topContent={
                        <Text style={styles.centerText}>
                            Escaneie o QR Code
                        </Text>
                    }
                />
            )}

            <Pressable style={styles.button} onPress={cadastrarAlimento}>
                <Text style={styles.text}>Cadastrar alimento</Text>
            </Pressable>

            <Text style={styles.title}>Lista de alimentos</Text>
            <ScrollView style={styles.scrollView}>
                {alimentos.map(item => (
                    <View style={styles.alimentoItem} key={item.id}>
                        <Text style={styles.alimentoNome}>Nome: {item.nome}</Text>
                        <Text style={styles.alimentoNome}>Calorias: {item.calorias}</Text>
                        <Text style={styles.alimentoNome}>Proteínas: {item.proteinas}</Text>
                        <Text style={styles.alimentoNome}>Carboidratos: {item.carboidratos}</Text>
                        <Text style={styles.alimentoNome}>Gorduras: {item.gorduras}</Text>

                        <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                            <View style={styles.buttonDelete}>
                                <Text style={styles.buttonText}>DELETE</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { setSelectedAlimento(item); setModalVisible(true); }}>
                            <View style={styles.buttonUpdate}>
                                <Text style={styles.buttonText}>UPDATE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Modal animationType="slide" visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }} >
                <View style={styles.container}>
                    <Text style={styles.title}>Editar Alimento</Text>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Novo Nome"
                        placeholderTextColor="black"
                        value={modalNome}
                        onChangeText={setModalNome}
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Nova Caloria"
                        placeholderTextColor="black"
                        value={modalCalorias}
                        onChangeText={text => setModalCalorias(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Nova Proteína"
                        placeholderTextColor="black"
                        value={modalProteinas}
                        onChangeText={text => setModalProteinas(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Novo Carboidrato"
                        placeholderTextColor="black"
                        value={modalCarboidratos}
                        onChangeText={text => setModalCarboidratos(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Nova Gordura"
                        placeholderTextColor="black"
                        value={modalGorduras}
                        onChangeText={text => setModalGorduras(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { handleUpdate(); setModalVisible(!modalVisible); }}
                    >
                        <Text style={styles.text}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.text}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <BottomBar navigation={navigation} />
        </View>
    );
};

export default AlimentosCrud;
