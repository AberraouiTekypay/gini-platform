import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import LeftArrowSvg from '../../assets/LeftArrowSvg.svg';
import AppsSvg from '../../assets/AppsSvg.svg';

import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface SponsorshipHeaderProps {
  onPress: () => void;
}

const SponsorshipHeader: React.FC<SponsorshipHeaderProps> = ({onPress}) => {
  const {t} = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className={'flex-row justify-between items-center'}>
      <View>
        <Text className={'text-[#ccc]'}>{t('Bonjour')} &#128512;,</Text>
        <Text className={'text-white font-bold text-base'}>User Name.</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <LeftArrowSvg />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onPress}
        className={'p-2 border-2 border-[#ccc] rounded-full border-solid'}>
        <AppsSvg />
      </TouchableOpacity>
    </View>
  );
};

export default SponsorshipHeader;
