import env from '../config/env';
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import WhiteRightSmallArrow from '../../assets/WhiteRightSmallArrow.svg';
import FlashSvg from '../../assets/FlashSvg.svg';
import InfoSvg from '../../assets/InfoSvg.svg';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface FormuleAvailableProps {
  next: keyof RootStackParamList;
}

const FormuleAvailable: React.FC<FormuleAvailableProps> = ({next}) => {
  const {t} = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate(next as any)} // TODO: Type this properly if needed, cast to any for now to avoid complex navigation type issues
      className={
        'flex-row items-center justify-between border-[#936EE3] border-4 rounded-xl bg-[#F5F3F3]'
      }>
      <View>
        <View className={'flex-row mb-5'}>
          <FlashSvg />
          <View>
            <Text className={'text-black font-semibold '}>{t('Gini Confort')}</Text>
            <Text className={'text-black'}>
            {t('entre')} <Text className={'font-semibold'}>200 {env.CURRENCY_CODE} </Text> 
              <Text className={'font-semibold'}>20 000 {env.CURRENCY_CODE}</Text>
              {'\n'}{t('débloquables en quelques minutes.')}
            </Text>
          </View>
        </View>

        <View className={'flex-row justify-end items-center ml-32'}>
          <Text className={'mr-1 text-black'}>{t('En savoir plus sur ce prêt')}</Text>
          <InfoSvg />
        </View>
      </View>

      <View
        className={
          'flex bg-[#936EE3] h-full w-[30px] items-center justify-center'
        }>
        <WhiteRightSmallArrow />
      </View>
    </TouchableOpacity>
  );
};

export default FormuleAvailable;
