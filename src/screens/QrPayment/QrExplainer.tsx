import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';

import LogoBlackSvg from '../../../assets/LogoBlackSvg.svg';
import LeftBlackArrowSvg from '../../../assets/LeftBlackArrowSvg.svg';
import QrSvg from '../../../assets/QrSvg.svg';

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ButtonRadius from '../../components/atoms/ButtonRadius';

const QrExplainer = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View className={'flex-1 pt-6'}>
      <View className={'px-4 gap-6'}>
        <LogoBlackSvg />
        <TouchableOpacity>
          <LeftBlackArrowSvg />
        </TouchableOpacity>
      </View>
      <View className={'flex-1 items-center gap-2 '}>
        <Text className={'text-black font-bold text-2xl'}>
          {t('Paiement par code QR')}
        </Text>
        <ScrollView
          className={'h-[350px] w-full'}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <QrSvg />
        </ScrollView>
        <Text className={'text-black font-bold text-2xl text-center'}>{t('Payez vos achats avec un\nsimple scan')}</Text>
        <Text className={'text-black font-bold text-center py-3 px-5'}>
          {t('Scannez le code affiché chez votre marchand et insérez le montant a payer pour effectuer votre transaction.')}
        </Text>
      </View>
        <View className={'items-center'}>
            <ButtonRadius onPress={() => navigation.navigate('QrScan')} buttonText={t('Procéder au paiement')} background={true} />
        </View>
    </View>
  );
};

export default QrExplainer;
