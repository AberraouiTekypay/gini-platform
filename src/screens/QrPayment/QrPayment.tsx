import {View, Text} from 'react-native';
import React from 'react';
import QrTrackHeader from '../../containers/QrTrackHeader';
import {useTranslation} from 'react-i18next';
import DropDownComponent from '../../components/atoms/DropDownComponent';
import ButtonRadius from '../../components/atoms/ButtonRadius';
import { useNavigation } from '@react-navigation/native';

const QrPayment = () => {
    const navigation = useNavigation()
  const {t} = useTranslation();
  return (
    <View className={'flex-1 px-4 pt-6'}>
      <QrTrackHeader progress={1} />
      <View className={' mt-5'}>
        <Text className={'text-black font-bold text-2xl'}>{t('Paiement')}</Text>
        <Text className={'mt-1 text-[#ccc]'}>
          {t('Payer le montant de votre transaction')}
        </Text>
      </View>
      <View className={'flex-1 mt-2'}>
        <DropDownComponent title={t('Montant de la transaction')} />
      </View>
      <View className={'items-center'}>
        <ButtonRadius onPress={() => navigation.navigate('QrConfirmationPin')} buttonText={t('Payer')} background={true} />
      </View>
    </View>
  );
};

export default QrPayment;
