import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import AcceuilSvg from '../../assets/AcceuilSvg.svg';
import WalletSvg from '../../assets/WalletSvg.svg';
import LoansSvg from '../../assets/LoansSvg.svg';
import NrmlHomeSvg from '../../assets/NrmlHomeSvg.svg';
import WhiteWalletSvg from '../../assets/WhiteWaletSvg.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import { useTranslation } from 'react-i18next';

interface DashboardBottomTabProps {
  home?: boolean;
  wallet?: boolean;
}

const DashboardBottomTab: React.FC<DashboardBottomTabProps> = ({home, wallet}) => {
  const {t} = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className={'flex-row items-center justify-around m-5'}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        className={'items-center'}>
        {home ? <AcceuilSvg /> : <NrmlHomeSvg />}
        <Text className={'text-[#ccc]'}>{t('Accueil')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Wallet')}
        className={'items-center'}>
        {wallet ? <WhiteWalletSvg /> : <WalletSvg />}
        <Text className={'text-[#ccc]'}>{t('Portefeuille')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Loans')}
        className={'items-center'}>
        <LoansSvg />
        <Text className={'text-[#ccc]'}>{t('Mes prêts')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardBottomTab;
