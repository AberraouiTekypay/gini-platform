import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

import ArrowSvg from '../../assets/ArrowSvg.svg';
import AnimatedDots from './animated/AnimatedDots';

interface FooterProps {
  walkthrough: boolean;
}

const Footer: React.FC<FooterProps> = ({walkthrough}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigation = () => {
    if (walkthrough) {
      navigation.navigate('SecondWalkThrough');
    } else {
      navigation.navigate('SignIn');
    }
  };

  return (
    <View className={'flex '}>
      <View className={'w-full pb-12'}>
        <Text className="text-white font-bold text-3xl leading-9 my-1">
          {walkthrough
            ? t("Aussi facile que d'emprunter à un ami.")
            : t('Portefeuille, carte de crédit et plus...')}
        </Text>

        {walkthrough ? (
          <Text className={'text-[#BBBCBA] leading-5 text-base'}>
            {t(
              'Empruntez le montant que vous voulez en quelques clics grâce à Gini',
            )}
            &#128526;
          </Text>
        ) : (
          <Text className={'text-[#BBBCBA] leading-5 text-base'}>
            {t(
              `Gini est une application bancaire complète qui vous permettra d'atteindre l'autonomie financière`,
            )}
          </Text>
        )}
      </View>
      <View className={'flex-row items-center justify-between mb-2'}>
        <AnimatedDots animated={walkthrough} />
        <TouchableOpacity
          className={
            'flex-row items-center justify-between rounded-full h-[57px] bg-[#936EE3]'
          }
          onPress={handleNavigation}>
          <View className={'px-4'}>
            <Text className={'text-white'}>
              {walkthrough ? t('Suivant') : t('Ça commence ici')}
            </Text>
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
  );
};

export default Footer;
