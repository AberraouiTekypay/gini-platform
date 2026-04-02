import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

import LogoBlackSvg from '../../../assets/LogoBlackSvg.svg';
import GlowingLogo from '../../components/animated/GlowingLogo';
import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const FirstTimeLoanAnalyse = () => {
  const {t} = useTranslation()
  const navigation = useNavigation();

  useEffect(() => {
    // Delay navigation by 5 seconds
    const timeout = setTimeout(() => {
      // Navigate to another screen
      navigation.navigate('FirstTimeLoanCongratulations', {
        firstText: 'Parfait!',
        secondText: 'vous êtes éligibles au prêt que vous avez demandé',
        nextScreen: 'FirstTimeLoanProof',
        buttonText: 'Compléter ma demande',
      }); // Replace 'OtherScreen' with the name of the screen you want to navigate to
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timeout); // Clear the timeout if the component unmounts
  }, []);

  return (
    <View className={'px-4 pt-6'}>
      <LogoBlackSvg />
      <View className={'mt-12'}>
        <Text className={'text-black font-bold text-2xl'}>
        {t('Analyse en cours')}
        </Text>
        <Text className={'mt-1 text-[#ccc]'}>{t('Veuillez patienter...')}</Text>
      </View>
      <View className={'items-center justify-center mt-[20%]'}>
        <GlowingLogo />
      </View>
    </View>
  );
};

export default FirstTimeLoanAnalyse;
