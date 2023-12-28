import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import BottomBar from '../components/bottombar';
import styles from './styles';

const { width } = Dimensions.get('window');

const HistoricoCalorias = ({ navigation }) => {
    const [dadosPorDia, setDadosPorDia] = useState({});

    useEffect(() => {
        carregarHistoricoCaloria();
    }, []);

    const carregarHistoricoCaloria = async () => {
        try {
            const CaloriaCollection = collection(db, 'refeicoes_feita');
            const q = query(CaloriaCollection, orderBy('hora'));

            const querySnapshot = await getDocs(q);
            const dadosCaloria = {};

            querySnapshot.forEach((doc) => {
                const data = doc.data().hora.toDate().toLocaleDateString('pt-BR');
                const calorias = doc.data().calorias;

                if (!dadosCaloria[data]) {
                    dadosCaloria[data] = calorias;
                } else {
                    dadosCaloria[data] += calorias;
                }
            });

            setDadosPorDia(dadosCaloria);
        } catch (error) {
            console.error('Erro ao carregar histórico de Caloria:', error);
        }
    };

    const formatChartData = () => {
        const dates = Object.keys(dadosPorDia);
        const chartData = dates.map((date) => ({
            date,
            calorias: dadosPorDia[date],
        }));
        return chartData;
    };

    const renderChart = () => {
        const chartData = formatChartData();

        if (chartData.length === 0) {
            return <Text>Nenhum dado disponível</Text>;
        }

        return (
            <View style={{ height: 400, flexDirection: 'row', width: width - 20, backgroundColor: '#666', padding: 10 }}>
                <YAxis
                    data={chartData.map((data) => data.calorias)}
                    contentInset={{ top: 20, bottom: 30 }}
                    svg={{ fill: 'white', fontSize: 10 }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}kcal`}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={chartData}
                        xAccessor={({ index }) => index}
                        yAccessor={({ item }) => item.calorias}
                        svg={{ stroke: '#ff4d88' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10 }}
                        data={chartData}
                        formatLabel={(value, index) => chartData[index].date}
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

export default HistoricoCalorias;