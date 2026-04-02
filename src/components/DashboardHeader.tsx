import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import AppsSvg from '../../assets/AppsSvg.svg';
import { useTranslation } from 'react-i18next';

interface DashboardHeaderProps {
  onPress: () => void;
  firstName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({onPress, firstName='Mouna'}) => {

const {t} = useTranslation()
  
  return (
    <View className={'flex-row justify-between items-center'}>
      <View className={'flex'}>
        <Text className={'text-[#ccc]'}>{t('Bonjour')} &#128512;,</Text>
        <Text className={'text-white font-bold text-base'}>{firstName}.</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        className={'p-2 border-2 border-[#ccc] rounded-full border-solid'}>
        <AppsSvg />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardHeader;
