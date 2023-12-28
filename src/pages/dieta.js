import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Clipboard, Pressable, ScrollView } from 'react-native';
import BottomBar from '../components/bottombar';
import { Picker } from '@react-native-picker/picker';
import { writeBatch, batch, deleteDoc, getDocs, collection, onSnapshot, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import auth from '@react-native-firebase/auth';
import styles from './styles';

const Dieta = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [importModalVisible, setImportModalVisible] = useState(false);
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [dietaNome, setDietaNome] = useState('');
    const [HorarioDieta, setHorarioDieta] = useState('');
    const [selectedAlimento, setSelectedAlimento] = useState(null);
    const [alimentos, setAlimentos] = useState([]);
    const [alimentosSistema, setAlimentosSistema] = useState([]);
    const [dietas, setDietas] = useState([]);
    const [detalhesVisiveisArray, setDetalhesVisiveisArray] = useState([]);
    const [ImportUserId, setImportUserId] = useState('');
    const [exportedUserId, setExportedUserId] = useState(auth().currentUser.uid);

    const handleCadastrarDieta = () => {
        const novoAlimento = selectedAlimento;

        if (novoAlimento) {
            const novaDieta = {
                userId: auth().currentUser.uid,
                nome: dietaNome,
                horario: HorarioDieta,
                alimentos: [...alimentos, novoAlimento],
            };

            addDoc(collection(db, 'refeicoes'), novaDieta)
                .then(() => {
                    console.log('Dieta cadastrada com sucesso:', novaDieta);
                    setDietaNome('');
                    setHorarioDieta('');
                    setAlimentos([]);
                    setModalVisible(false);
                })
                .catch(error => {
                    console.error('Erro ao cadastrar dieta:', error);
                });

            carregarDietas();
        }
    };

    const registrarRefeicaoFeita = async (dietaId) => {
        try {
            const dieta = dietas.find((d) => d.id === dietaId);
            const alimentosRefeicao = dieta.alimentos;

            for (const alimento of alimentosRefeicao) {
                const refeicaoFeita = {
                    userId: auth().currentUser.uid,
                    dietaId: dietaId,
                    calorias: alimento.calorias,
                    gordura: alimento.gorduras,
                    carboidrato: alimento.carboidratos,
                    proteina: alimento.proteinas,
                    hora: new Date(),
                };

                await addDoc(collection(db, 'refeicoes_feita'), refeicaoFeita);
            }

            console.log('Refeição registrada com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar refeição:', error);
        }
    };

    const handleAdicionarAlimento = () => {
        if (selectedAlimento) {
            setAlimentos([...alimentos, selectedAlimento]);
        }
    };

    useEffect(() => {
        const unsubscribeAlimentos = onSnapshot(collection(db, 'alimentos'), snapshot => {
            const listaAlimentosSistema = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).filter(a => a.userId === auth().currentUser.uid);
            setAlimentosSistema(listaAlimentosSistema);
        });

        return () => {
            unsubscribeAlimentos();
        };
    }, []);

    const carregarDietas = async () => {
        try {
            const dietasSnapshot = await getDocs(collection(db, 'refeicoes'));
            const listaDietas = dietasSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).filter(d => d.userId === auth().currentUser.uid);
            setDietas(listaDietas);
            setDetalhesVisiveisArray(listaDietas.map((d) => ({ dietaId: d.id, visivel: false })));
        } catch (error) {
            console.error('Erro ao carregar dietas:', error);
        }
    }

    useEffect(() => {
        carregarDietas();
    }, []);

    const handleDetalhesVisiveisToggle = (dietaId) => {
        setDetalhesVisiveisArray((prevArray) =>
            prevArray.map((item) => ({
                dietaId: item.dietaId,
                visivel: item.dietaId === dietaId ? !item.visivel : item.visivel,
            }))
        );
    };

    const handleImportarDieta = async () => {
        try {
            const batchOperation = writeBatch(db);

            dietas.forEach((dieta) => {
                const dietaRef = doc(db, 'refeicoes', dieta.id);
                batchOperation.delete(dietaRef);
            });

            await batchOperation.commit();

            const refeicoesSnapshot = await getDocs(collection(db, 'refeicoes'));

            const refeicoesUsuario = refeicoesSnapshot.docs
                .filter((refeicaoDoc) => refeicaoDoc.data().userId === ImportUserId)
                .map((refeicaoDoc) => refeicaoDoc.data());

            for (const refeicaoData of refeicoesUsuario) {
                const novaDieta = {
                    userId: auth().currentUser.uid,
                    nome: refeicaoData.nome,
                    horario: refeicaoData.horario,
                    alimentos: refeicaoData.alimentos,
                };

                await addDoc(collection(db, 'refeicoes'), novaDieta);
            }

            console.log('Refeições importadas com sucesso para o usuário logado.');

            carregarDietas();

            setImportModalVisible(false);
        } catch (error) {
            console.error('Erro ao importar dieta:', error);
        }
    };




    const handleExportarDieta = () => {
        try {
            Clipboard.setString(exportedUserId);

            console.log('ID do usuário logado copiado para a área de transferência:', exportedUserId);

            setExportModalVisible(false);
        } catch (error) {
            console.error('Erro ao exportar dieta:', error);
        }
    };

    console.log('modalVisible: ', modalVisible);
    console.log('importModalVisible: ', importModalVisible);
    console.log('exportModalVisible: ', exportModalVisible);

    return (
        <View style={styles.container}>
            <BottomBar navigation={navigation} />
            <Text style={styles.title}>Dieta</Text>

            <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.text}>Cadastrar Refeicoes</Text>
            </Pressable>

            <Pressable onPress={() => setImportModalVisible(true)} style={styles.button}>
                <Text style={styles.text}>Importar Dieta</Text>
            </Pressable>

            <Pressable onPress={() => setExportModalVisible(true)} style={styles.button}>
                <Text style={styles.text}>Exportar Dieta</Text>
            </Pressable>

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.container}>
                    <Text style={styles.title}>Cadastrar Refeicoes</Text>

                    <TextInput
                        style={styles.TextInput}
                        placeholder="Nome da Dieta"
                        placeholderTextColor="black"
                        onChangeText={(text) => setDietaNome(text)}
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Horario da refeição "
                        placeholderTextColor="black"
                        onChangeText={(text) => setHorarioDieta(text)}
                    />

                    <Picker
                        selectedValue={selectedAlimento}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setSelectedAlimento(itemValue)}
                    >
                        <Picker.Item label="Selecione um alimento" value={null} />
                        {alimentosSistema.map((item) => (
                            <Picker.Item key={item.id} label={item.nome} value={item} />
                        ))}
                    </Picker>

                    <TouchableOpacity style={styles.button} onPress={handleCadastrarDieta}>
                        <Text style={styles.text}>Cadastrar Refeicoes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.text}>Cancelar</Text>
                    </TouchableOpacity>

                </View>
            </Modal>

            <Modal visible={importModalVisible} animationType="slide">
                <View style={styles.container}>
                    <Text style={styles.title}>Importar Dieta</Text>

                    <TextInput
                        style={styles.TextInput}
                        placeholder="ID da Dieta a ser importada"
                        placeholderTextColor="black"
                        onChangeText={(text) => setImportUserId(text)}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleImportarDieta}>
                        <Text style={styles.text}>Importar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => setImportModalVisible(false)}>
                        <Text style={styles.text}>Cancelar</Text>
                    </TouchableOpacity>

                </View>
            </Modal>

            <Modal visible={exportModalVisible} animationType="slide">
                <View style={styles.container}>
                    <Text style={styles.title}>Exportar Dieta</Text>

                    <Text style={styles.text}>ID da dieta a ser compartilhada: </Text>

                    <Text style={styles.text}>{exportedUserId}</Text>

                    <TouchableOpacity style={styles.button} onPress={handleExportarDieta}>
                        <Text style={styles.buttonText}>Copiar código</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => setExportModalVisible(false)}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <ScrollView style={styles.scrollView}>
                {dietas.map((d) => (
                    <View key={d.id} style={styles.dietaContainer}>
                        <TouchableOpacity onPress={() => handleDetalhesVisiveisToggle(d.id)}>
                            <Text style={styles.listaDietasItem}>Nome da refeição: {d.nome}</Text>
                            <Text style={styles.listaDietasItem}>Horário da refeição: {d.horario}</Text>
                            <Text style={styles.listaDietasItem}>Alimento: ↓ </Text>
                        </TouchableOpacity>

                        {detalhesVisiveisArray.find((item) => item.dietaId === d.id && item.visivel) && (
                            d.alimentos.map((alimento, index) => (
                                <View key={index} style={styles.detalhesAlimentoContainer} >
                                    <Text style={styles.detalhesAlimentoItem}>Nome do Alimento: {alimento.nome}</Text>
                                    <Text style={styles.detalhesAlimentoItem}>Calorias: {alimento.calorias}</Text>
                                    <Text style={styles.detalhesAlimentoItem}>Carboidrato: {alimento.carboidratos}</Text>
                                    <Text style={styles.detalhesAlimentoItem}>Gordura: {alimento.gorduras}</Text>
                                </View>
                            ))
                        )}

                        {detalhesVisiveisArray.find((item) => item.dietaId === d.id && item.visivel) && (
                            <TouchableOpacity style={styles.button} onPress={() => registrarRefeicaoFeita(d.id)}>
                                <Text style={styles.buttonText}>Registrar Refeição Feita</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </ScrollView>
            <BottomBar navigation={navigation} />
        </View>
    );
};

export default Dieta;