import {View, Text, Image} from 'react-native';
import React from 'react';

import GiniwalletSvg from '../../../assets/GiniwalletSvg.svg';
import QrCodeSvg from '../../../assets/QrCodeSvg.svg';
import { BlurView } from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';


const WalletCard = () => {
  const {t} = useTranslation()
  return (
    <View
      className={
        ' bg-[#ccc] flex flex-col items-center justify-between rounded-xl h-[260px] w-[350px] mt-4'
      }
      style={{width: 350, opacity: 1}}>
        <View style={{position: 'relative' , width: 350, height: 260, borderRadius: 12, overflow: 'hidden'}}>
      <Image
        source={require('../../../assets/BigColors.png')}
        style={{width: '100%'}}
      />
      <BlurView
        blurAmount={20}
        style={{
          width: 350,
          height: 260,
          position: 'absolute',
        }}
      />
      </View>
    <View className={'absolute w-[350px] h-[260px] items-center rounded-lg pt-8'}>
      <GiniwalletSvg />
      <Text className={'text-white font-bold mt-2'}>{t('Solde actuel')}</Text>
      <Text className={'text-white text-4xl font-bold mt-6'}>19,768.96 DH</Text>
      <View className={'flex-row items-center justify-between bg-gray-700 h-[80px] w-[96%] rounded-md px-2 mt-7'}>
        <View className={''}>
          <Text className={'text-white font-bold leading-6'}>{t('Scannez et payez')}</Text>
          <Text className={'text-white leading-5'}>{t('Scannez un code QR pour faire un\npaiement')}</Text>
        </View>
        <View className={
          'items-center justify-center bg-gray-800 rounded-full h-14 w-14'
        }>
          <QrCodeSvg />
        </View>
      </View>
    </View>
    </View>
  );
};

export default WalletCard;
