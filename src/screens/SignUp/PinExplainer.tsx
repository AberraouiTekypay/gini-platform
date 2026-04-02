import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import CloseSvg from '../../../assets/CloseSvg.svg';
import PinExampleSvg from '../../../assets/PinExampleSvg.svg'

const PinExplainer = () => {
  const {t} = useTranslation()
    const navigation = useNavigation()
  return (
    <View className={'flex-1 px-4 pt-6'}>
      <Header normal={false} />
      <View className={'px-4'}>
        <TouchableOpacity className={'flex-row justify-end mt-5'} onPress={() => navigation.navigate('SignIn')}>
          <CloseSvg />
        </TouchableOpacity>
      </View>
      <View className={'flex items-center gap-2'}>
        <Text className={'text-black font-bold text-2xl'}>{t('security pin')}</Text>
        <ScrollView className={'h-[350px] bg-[white]'} showsHorizontalScrollIndicator={false} horizontal={false} showsVerticalScrollIndicator={false}>
          <PinExampleSvg />
        </ScrollView>
        <Text className={'text-black font-bold text-2xl'}>{t('Sécurisez votre compte')}</Text>
        <Text className={'text-black font-bold text-center py-3 px-5'}>
          {t('Définissez un code à 4 chiffres pour accéder à votre compte Gini et autoriser toutes les transactions sur votre wallet')}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Pin')}
        className={
          ' absolute bottom-2 flex items-center justify-center self-center bg-[#936EE3] rounded-full w-[350px] h-[56px]'
        }>
        <Text className={'text-white text-sm'}>{t('Créer mon code pin')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PinExplainer;
