import env from '../../config/env';
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

import {BlurView} from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';

interface LoanCardInfosProps {
  width?: number;
}

const LoanCardInfos: React.FC<LoanCardInfosProps> = ({width = 347}) => {
  const {t} = useTranslation()
  return (
    <View
      className={
        ' bg-gray-300 flex flex-col items-center justify-between rounded-xl h-[210px]'
      }
      style={{width: width, opacity: 1}}>
        <View style={{position: 'relative' , width: width, height: 210, borderRadius: 12, overflow: 'hidden'}}>
      <Image
        source={require('../../../assets/BigColors.png')}
        style={{width: '100%'}}
      />
      <BlurView
        blurAmount={20}
        style={{
          width: width,
          height: 210,
          position: 'absolute',
        }}
      />
      </View>
      <View className={'absolute'}>
        <View className={' flex-row justify-between items-center'}>
          <Text className={'text-white font-light text-base'}>
            {t('Échéance dûe:')}
          </Text>
          <Text className={'text-white font-light text-base'}>
            {t('en date du')} <Text className={'font-bold'}>6 Mai 2023</Text>
          </Text>
        </View>
        <Text className={'text-white text-4xl font-bold my-3'}>309.00 {env.CURRENCY_CODE}</Text>
        <View className={'flex-row items-center justify-between'}>
          <Text className={'text-white text-sm font-light'}>
            {t('Montant du prêt:')}{'\n'}
            <Text className={'font-bold text-base'}>15000 {env.CURRENCY_CODE}</Text>
          </Text>
          <Text className={'text-white text-sm font-light'}>
            {t('Somme payée:')}{'\n'}
            <Text className={'font-bold text-base'}>3500 {env.CURRENCY_CODE}</Text>
          </Text>
          <Text className={'text-white text-sm font-light'}>
            {t('Reste à payer:')}{'\n'}
            <Text className={'font-bold text-base'}>9500 {env.CURRENCY_CODE}</Text>
          </Text>
        </View>

        <View className={'gap-1'}>
          <Text className={'text-white font-light text-base'}>{t('Avancement')}:</Text>
          <Progress.Bar
            progress={1 / 3}
            width={317}
            height={10}
            color="#7EC922"
            unfilledColor="#D9D9D9"
            borderColor="transparent"
            borderWidth={0}
          />
          <View className={'flex-row justify-between items-center'}>
            <Text className={'text-white '}>0 {env.CURRENCY_CODE}</Text>
            <Text className={'text-white '}>15000 {env.CURRENCY_CODE}</Text>
          </View>
        </View>
      </View>
      
    </View>
  );
};

export default LoanCardInfos;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    width: '100%',
    height: '100%',
  },
});
