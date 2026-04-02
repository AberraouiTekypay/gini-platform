import {View, Text} from 'react-native';
import React from 'react';

import LogoBlackSvg from '../../../assets/LogoBlackSvg.svg';
import CloseSvg from '../../../assets/CloseSvg.svg';
import PurseSvg from '../../../assets/PurseSvg.svg';
import ButtonRadius from '../../components/atoms/ButtonRadius';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../AppContext';
import { useTranslation } from 'react-i18next';

const FirstTimeLoanApproved = () => {
  const {t} = useTranslation()
  const navigation = useNavigation()
  return (
    <View className={'flex-1 px-4 pt-6'}>
      <View className={'flex-row items-center justify-between'}>
        <LogoBlackSvg />
        <CloseSvg />
      </View>
      <View className={'mt-12'}>
        <Text className={'text-black font-bold text-2xl'}>{t('Félicitations!')}</Text>
        <Text className={'mt-1 text-[#ccc]'}>
        {t('Votre prêt a été accordé. La somme débloquée\nsera sur votre compte Gini en 48 heures ouvrée.')}
        </Text>
      </View>
      <View className={'flex-1 mt-36'}>
        <View className={'items-center justify-center'}>
          <Text className={'text-[#936EE3] text-4xl font-bold text-center'}>
            +15 000{'\n'}
            <Text className={'text-[#936EE3] text-2xl font-bold text-center'}>
              dirhams
            </Text>
          </Text>
          <PurseSvg />
        </View>
      </View>
      <View className={'items-center'}>
        <ButtonRadius onPress={() => navigation.navigate('Dashboard')} buttonText={t('Retour à l’accueil')} background={true} />
      </View>
    </View>
  );
};

export default FirstTimeLoanApproved;
