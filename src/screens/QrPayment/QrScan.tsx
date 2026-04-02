import {View, Text, Dimensions} from 'react-native';
import React, {useRef, useEffect} from 'react';
import QrTrackHeader from '../../containers/QrTrackHeader';
import { useNavigation } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import { NavigationProp } from '../../navigation/types';

const QrScan = () => {
  const navigation = useNavigation<NavigationProp>();
  const cameraRef = useRef<RNCamera>(null);

  const handleBarCodeScanned = ({type, data}: {type: string, data: string}) => {
    // Handle the scanned QR code data here
    if (type === 'QR_CODE' || type === 'org.iso.QRCode')
        navigation.navigate('QrPayment')
  };

  useEffect(() => {
    // Start scanning for QR codes when the component mounts
    const startScanning = async () => {
      if (cameraRef.current) {
        await cameraRef.current.resumePreview();
      }
    };

    startScanning();

    // Stop scanning when the component unmounts
    return () => {
      if (cameraRef.current) {
        cameraRef.current.pausePreview();
      }
    };
  }, []);

  return (
    <View className={'flex-1 px-4 pt-6'}>
      <QrTrackHeader progress={0} />
      <View className={'items-center justify-center mt-16'}>
        <Text className={' text-[#ccc]'}>Placez le code marchand ici:</Text>
        <RNCamera
          ref={cameraRef}
          style={{
            width: Dimensions.get('window').width - 32,
            aspectRatio: 1,
            borderColor: '#ccc',
            borderWidth: 2,
          }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={handleBarCodeScanned} />
      </View>
    </View>
  );
};

export default QrScan;
