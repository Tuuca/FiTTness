import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import BottomBar from '../components/bottombar';
import auth from '@react-native-firebase/auth';
import styles from './styles';

const { width } = Dimensions.get('window');

userId = auth().currentUser.uid;

const HistoricoPeso = ({ navigation }) => {
    const [pesos, setPesos] = useState([]);

    useEffect(() => {
        carregarHistoricoPeso();
    }, []);

    const carregarHistoricoPeso = async () => {
        try {
            const pesoCollection = collection(db, 'peso');
            const q = query(pesoCollection, orderBy('timestamp'));

            const querySnapshot = await getDocs(q);
            const dadosPeso = [];

            querySnapshot.forEach((doc) => {
                dadosPeso.push({
                    id: doc.data().userId,
                    date: doc.data().timestamp.toDate().toLocaleDateString('pt-BR'),
                    weight: doc.data().peso,
                });
            });

            setPesos(dadosPeso.filter((peso) => peso.id === userId));
        } catch (error) {
            console.error('Erro ao carregar histórico de peso:', error);
        }
    };


    const renderChart = () => {
        if (pesos.length === 0) {
            return <Text>Nenhum dado disponível</Text>;
        }

        return (
            <View style={{ height: 400, flexDirection: 'row', width: width - 20, backgroundColor: '#666', padding: 10 }}>
                <YAxis
                    data={pesos.map((data) => data.weight)}
                    contentInset={{ top: 20, bottom: 30 }}
                    svg={{ fill: 'white', fontSize: 10 }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}kg`}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={pesos.map((data) => data.weight)}
                        svg={{ stroke: '#ff4d88' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: - 10 }}
                        data={pesos.map((_, index) => index)}
                        formatLabel={(value, index) => pesos[index].date}
                        svg={{ fontSize: 10, fill: 'white' }}
                        contentInset={{ left: 35, right: 35, bottom: 35 }}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderChart()}
            <BottomBar navigation={navigation} />
        </View>
    );
};

export default HistoricoPeso;