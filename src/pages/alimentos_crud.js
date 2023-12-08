import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig';
import BottomBar from '../components/bottombar';
import auth from '@react-native-firebase/auth';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

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
                placeholder="Código de Barras"
                placeholderTextColor="black"
                value={CodigoBarra}
                onChangeText={(text) => {
                    setCodigoBarra(text.replace(/[^0-9]/g, ''));
                    setShouldNavigateBack(true);
                }}
                keyboardType="numeric"
            />

            <Button style={styles.button} title="Scannear Produto" color="#2E2E2E" onPress={navigateToScanner} />


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

            <Button title="Cadastrar Alimento" color="#2E2E2E" onPress={cadastrarAlimento} style={{ marginTop: 40 }} />

            <Text style={styles.title}>Lista de Alimentos</Text>
            <ScrollView style={styles.scrollView}>
                {alimentos.map(item => (
                    <View style={styles.alimentoItem} key={item.id}>
                        <Text style={styles.alimentoNome}>{item.nome}</Text>
                        <Text style={styles.alimentoNome}>Calorias: {item.calorias}</Text>
                        <Text style={styles.alimentoNome}>Proteínas: {item.proteinas}</Text>
                        <Text style={styles.alimentoNome}>Carboidratos: {item.carboidratos}</Text>
                        <Text style={styles.alimentoNome}>Gorduras: {item.gorduras}</Text>

                        {/* Botão DELETE */}
                        <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                            <View style={styles.buttonDelete}>
                                <Text style={styles.buttonText}>DELETE</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Botão UPDATE */}
                        <TouchableOpacity onPress={() => { setSelectedAlimento(item); setModalVisible(true); }}>
                            <View style={styles.buttonUpdate}>
                                <Text style={styles.buttonText}>UPDATE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* Modal para realizar o update */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Editar Alimento</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Novo Nome"
                            placeholderTextColor="black"
                            value={modalNome}
                            onChangeText={setModalNome}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Nova Caloria"
                            placeholderTextColor="black"
                            value={modalCalorias}
                            onChangeText={text => setModalCalorias(text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Nova Proteína"
                            placeholderTextColor="black"
                            value={modalProteinas}
                            onChangeText={text => setModalProteinas(text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Novo Carboidrato"
                            placeholderTextColor="black"
                            value={modalCarboidratos}
                            onChangeText={text => setModalCarboidratos(text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Nova Gordura"
                            placeholderTextColor="black"
                            value={modalGorduras}
                            onChangeText={text => setModalGorduras(text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => { handleUpdate(); setModalVisible(!modalVisible); }}
                        >
                            <Text style={styles.buttonText}>Atualizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
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
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black',

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
    alimentoItem: {
        backgroundColor: '#ddd',
        margin: 10,
        padding: 20,
        borderRadius: 10,

    },
    alimentoNome: {
        fontSize: 17,
        color: 'black',
    },
    scrollView: {
        width: '100%',
    },
    buttonDelete: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonUpdate: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        width: 300,
        height: 400,
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
});

export default AlimentosCrud;
