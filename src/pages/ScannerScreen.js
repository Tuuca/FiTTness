import React , {useEffect, useState} from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const ScannerScreen = ({ route, navigation }) => {
    const { onBarcodeScan, setIsDataObtained } = route.params;
    const [isDataObtained, setLocalIsDataObtained] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const fakeQRCodeData = ''; 
            onBarcodeScan({ data: fakeQRCodeData });
            setIsDataObtained(true); 
        }, 2000);
    
        return () => clearTimeout(timeoutId);
    }, [onBarcodeScan, setIsDataObtained]);

    useEffect(() => {
        if (isDataObtained) {
            navigation.goBack();
            setIsDataObtained(true);
        }
    }, [isDataObtained, navigation, setIsDataObtained]);

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                style={{ flex: 1 }}
                onBarCodeRead={onBarcodeScan}
                flashMode={RNCamera.Constants.FlashMode.off}
            />
        </View>
    );
};

export default ScannerScreen;
