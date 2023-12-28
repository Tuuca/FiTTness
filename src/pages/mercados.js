import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import BottomBar from '../components/bottombar';
import styles from './styles';

const Mercados = ({ navigation }) => {
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [markets, setMarkets] = useState([]);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setRegion(prevRegion => ({
                    ...prevRegion,
                    latitude,
                    longitude,
                }));

                fetchNearbyMarkets(latitude, longitude);
            },
            error => {
                console.error(error);
            },
        );
    }, []);

    const fetchNearbyMarkets = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=grocery_or_supermarket&key=AIzaSyAO2ci74MC31tPT_lCnlkt7jS4uJ-jF-bc`
            );
            const data = await response.json();

            if (data && data.results) {
                setMarkets(data.results);
            }
        } catch (error) {
            console.error('Erro ao buscar mercados:', error);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Mercados próximos a você</Text>
            <MapView
                style={styles.map}
                region={region}
            >
                {markets.map((market, index) => (
                    <Marker
                        key={index}
                        color="black"
                        coordinate={{
                            latitude: market.geometry.location.lat,
                            longitude: market.geometry.location.lng,
                        }}
                        title={market.name}
                        description={market.vicinity
                        }
                    />
                ))}
                <Marker
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    title="Sua posição"
                    description="Você está aqui"
                />
            </MapView>
            <BottomBar navigation={navigation} />
        </View>
    );
};

export default Mercados;
