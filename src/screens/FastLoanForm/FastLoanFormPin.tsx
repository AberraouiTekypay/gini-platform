import {View, Text} from 'react-native';
import React from 'react';
import LoanFormHeader from '../../containers/LoanFormHeader';

import LockSvg from '../../../assets/LockSvg.svg';
import {useTranslation} from 'react-i18next';
import PinComponent from '../../containers/PinComponent';
import {useNavigation} from '@react-navigation/native';
import ButtonRadius from '../../components/atoms/ButtonRadius';

const FastLoanFormPin = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View className={'flex-1 px-4 pt-6'}>
      <LoanFormHeader progress={150} />
      <View className={'mt-5'}>
        <Text className={'text-black font-bold text-2xl'}>
          {t('Choisissez un Pin')}
        </Text>
        <View className={'flex-row items-center'}>
          <Text className={'text-[#626262] text-sm'}>
            {t('Insérez un code à 4 chiffres')}
          </Text>
          <LockSvg />
        </View>
      </View>
      <View className={'flex-1'}>
        <PinComponent />
      </View>
      <View className={'items-center'}>
        <ButtonRadius
          onPress={() => navigation.navigate('FastLoanFormContract')}
          buttonText={t('Confirmer')}
          background={true}
        />
      </View>
    </View>
  );
};

export default FastLoanFormPin;
