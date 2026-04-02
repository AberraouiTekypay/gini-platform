import env from '../config/env';
import {View, Text, Image} from 'react-native';
import React from 'react';

import {BlurView} from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';

const SummaryComponent = () => {
  const {t} = useTranslation()
  return (
    <View
      className={
        'bg-[#ccc] rounded-lg mt-2'
      }
      style={{opacity: 1}}>
        <View style={{position: 'relative' , width: '100%', height: 140, borderRadius: 12, overflow: 'hidden'}}>
      <Image
        source={require('../../assets/BigColors.png')}
        style={{width: '100%'}}
      />
      <BlurView
        blurAmount={20}
        style={{
          width: '100%',
          height: 140,
          position: 'absolute',
        }}
      />
      </View>
      
      <View className={'absolute flex-row items-center justify-between w-full'}>
        <View className={'py-3 px-2 gap-2'} >
          <Text className={'text-white'}>{t('Montant')}</Text>
          <Text className={'text-white'}>{t('Durée')}</Text>
          <Text className={'text-white'}>{t('Assurance')}</Text>
          <Text className={'text-white'}>{t('Mensualité TTC')}</Text>
        </View>
        <View className={'py-3 px-2 gap-2 items-end'}>
          <Text className={'text-white'}>15,000 {env.CURRENCY_CODE}</Text>
          <Text className={'text-white'}>06 Moins</Text>
          <Text className={'text-white'}>64 {env.CURRENCY_CODE}</Text>
          <Text className={'text-white font-bold'}>2606 {env.CURRENCY_CODE}</Text>
        </View>
      </View>
    </View>

  );
};

export default SummaryComponent;
