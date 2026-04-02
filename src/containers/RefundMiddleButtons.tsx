import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import CoinsSvg from '../../assets/CoinsSvg.svg';
import BankSvg from '../../assets/BankSvg.svg';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const RefundMiddleButtons = () => {
  const {t} = useTranslation()
  const navigation = useNavigation()
  
  return (
    <View className={'gap-2'}>
      <TouchableOpacity className={'flex-row items-center justify-between rounded-lg w-[347px] h-[80px] bg-[#393E41] px-4'}>
        <CoinsSvg />
        <Text className={'text-white font-light leading-5'}>
          {t('Débiter mon')} <Text className={'font-bold'}>{t('compte\nGini')}</Text>
        </Text>
        <Text className={'text-white font-light leading-5 text-right'}>{t('Montant dû')}{'\n'}<Text className={'font-bold text-lg'}>309.00 Dh</Text></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RefundAgencyFilter')} className={'flex-row items-center rounded-lg w-[347px] h-[80px] bg-white px-4'}>
        <BankSvg />
        <Text className={'text-black font-light leading-5 pl-10'}>
        {t('Payer en')} <Text className={'font-bold'}>{t('agence')}</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className={'flex-row items-center justify-between rounded-lg w-[347px] h-[80px] bg-[#936EE3] px-4'}>
        <Text className={'text-white font-light leading-5'}>
        {t('Rembourser par  ')}<Text className={'font-bold'}>{t('anticipation')}{'\n'}</Text>
        <Text className={'font-bold text-[10px]'}>{t('réduction cadeau de  ')}<Text className={'font-light'}>-2.5%</Text></Text>
        </Text>
        <Text className={'text-white font-light leading-5 text-right'}>{t('Total restant')}{'\n'}<Text className={'font-bold text-lg'}>9440.36 Dh</Text></Text></TouchableOpacity>
    </View>
  );
};

export default RefundMiddleButtons;
