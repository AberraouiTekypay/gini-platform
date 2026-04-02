import {View, Text, Dimensions} from 'react-native';
import React, {useRef, useEffect} from 'react';
import QrTrackHeader from '../../containers/QrTrackHeader';
import { useNavigation } from '@react-navigation/native';

const QrScan = () => {
  const navigation = useNavigation()
  const cameraRef = useRef(null);

  // const handleBarCodeScanned = ({type, data}) => {
  //   // Handle the scanned QR code data here
  //   console.log(`Scanned QR Code Type: ${type}`);
  //   console.log(`Scanned QR Code Data: ${data}`);
  //   if (type === 'QR_CODE')
  //       navigation.navigate('QrPayment')

  //   // You can add your custom logic here
  // };

  // useEffect(() => {
  //   // Start scanning for QR codes when the component mounts
  //   const startScanning = async () => {
  //     if (cameraRef.current) {
  //       await cameraRef.current.resumePreview();
  //     }
  //   };

  //   startScanning();

  //   // Stop scanning when the component unmounts
  //   return () => {
  //     if (cameraRef.current) {
  //       cameraRef.current.pausePreview();
  //     }
  //   };
  // }, []);

  return (
    <View className={'flex-1 px-4 pt-6'}>
      <QrTrackHeader progress={0} />
      <View className={'items-center justify-center mt-16'}>
        <Text className={' text-[#ccc]'}>Placez le code marchand ici:</Text>
        {/* <RNCamera
          ref={cameraRef}
          style={{
            width: Dimensions.get('window').width - 32,
            aspectRatio: 1,
            borderColor: '#ccc',
            borderWidth: 2,
          }}
          ratio="1:1"
          onBarCodeRead={handleBarCodeScanned}></RNCamera> */}
      </View>
    </View>
  );
};

export default QrScan;
