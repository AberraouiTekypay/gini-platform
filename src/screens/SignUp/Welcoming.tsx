import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import BackGroundSvgTwo from '../../../assets/BackGroundSvg-2.svg';

import { useNavigation } from '@react-navigation/native';

import ArrowSvg from '../../../assets/ArrowSvg.svg';
import { useAppContext } from '../../AppContext';
import { useTranslation } from 'react-i18next';

const Welcoming = () => {
  const {t} = useTranslation()
  const navigation = useNavigation();
  const {data, updateData} = useAppContext()

  return (
    <SafeAreaView className={'flex-1 justify-between pt-6 px-5 pb-2'}>
      <Header normal={false} />
      <View
        className={
          'absolute  justify-center items-center top-[40%] bottom-[70%] right-0 left-0'
        }>
        <BackGroundSvgTwo />
      </View>
      <View className={'flex'}>
        <View className={'pb-12'}>
          <Text className={'text-black font-bold text-3xl'}>
            {t('Bienvenue')} {data.signUpInfos.firstName} {t('sur Gini.')}
          </Text>
          <Text className={'text-[#BBBCBA] leading-5 text-base'}>
            {t('Empruntez le montant que vous souhaitez en quelques clics grâce a Gini')}
          </Text>
        </View>
        <View className={'flex-row justify-end'}>
          <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
            className={
              'flex-row items-center justify-between rounded-full h-[57px] bg-[#936EE3]'
            }
            >
            <View className={'px-4'}>
              <Text className={'text-white'}>{t('Lançez l’application')}</Text>
            </View>
            <View
              className={
                'bg-[#ccc] w-[50px] h-[50px] rounded-full items-center justify-center mx-1'
              }>
              <ArrowSvg />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcoming;
