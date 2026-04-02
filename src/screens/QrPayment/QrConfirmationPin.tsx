import {View, Text} from 'react-native';
import React from 'react';
import QrTrackHeader from '../../containers/QrTrackHeader';
import PinComponent from '../../containers/PinComponent';
import ButtonRadius from '../../components/atoms/ButtonRadius';
import {t} from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const QrConfirmationPin = () => {
    const {t} = useTranslation()
    const navigation = useNavigation()
  return (
    <View className={'flex-1 px-4 pt-6'}>
      <QrTrackHeader progress={1} />
      <View className={' mt-5'}>
        <Text className={'text-black font-bold text-2xl'}>
          {t('Confirmation PIN')}
        </Text>
        <Text className={'mt-1 text-[#ccc]'}>
          {t('Insérez votre pin pour confirmer la transaction')}
        </Text>
      </View>
      <View className={'flex-1'}>
        <PinComponent />
      </View>
      <View className={'items-center'}>
        <ButtonRadius
          onPress={() => navigation.navigate('QrSuccess')}
          buttonText={t('Confirmer')}
          background={true}
        />
      </View>
    </View>
  );
};

export default QrConfirmationPin;
