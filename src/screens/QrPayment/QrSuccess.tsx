import {View, Text} from 'react-native';
import React from 'react';
import QrTrackHeader from '../../containers/QrTrackHeader';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import PurseSvg from '../../../assets/PurseSvg.svg'
import SummaryComponent from '../../components/SummaryComponent';
import ButtonRadius from '../../components/atoms/ButtonRadius';

const QrSuccess = () => {
    const {t} = useTranslation()
    const navigation = useNavigation()

  return (
    <View className={'flex-1 px-4 pt-6'}>

      <QrTrackHeader progress={2} />

      <View className={'mt-5'}>
        <Text className={'text-black font-bold text-2xl'}>
          {t('Félicitations')},
        </Text>
        <Text className={'mt-1 text-[#ccc]'}>
          {t('Paiement effectué avec succès.')}
        </Text>
      </View>

      <View className={'flex-1 justify-center items-center my-14'}>
        <View className={'items-center justify-center'}>
          <Text className={'text-[#936EE3] text-4xl font-bold text-center'}>
            -245.20{'\n'}
            <Text className={'text-[#936EE3] text-2xl font-bold text-center'}>
              dirhams
            </Text>
          </Text>
          <PurseSvg />
        </View>
      </View>

      <View className={'flex-1 gap-2'}>
        <Text className={'text-black font-bold'}>{t('Détails de la transaction')}</Text>
        <SummaryComponent />
      </View>

      <View className={'items-center'}>
        <ButtonRadius onPress={() => navigation.navigate('Dashboard')} buttonText={t('Retour')} background={true} />
      </View>
    </View>
  );
};

export default QrSuccess;
