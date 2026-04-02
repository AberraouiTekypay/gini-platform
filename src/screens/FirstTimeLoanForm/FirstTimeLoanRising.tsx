import {View, Text} from 'react-native';
import React from 'react';
import LoanFormHeader from '../../containers/LoanFormHeader';
import DropDownComponent from '../../components/atoms/DropDownComponent';
import SummaryComponent from '../../components/SummaryComponent';
import ButtonRadius from '../../components/atoms/ButtonRadius';

import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const FirstTimeLoanRising = () => {
  const {t} = useTranslation()
  const navigation = useNavigation();

  return (
    <View className={' flex-1 justify-center items-center px-4 pt-6 '}>
      <LoanFormHeader progress={75} />
      <View className={'flex-1 mt-5 w-full'}>
        <View>
          <Text className={'text-black font-bold text-2xl'}>
          {t('Choix du montant')}
          </Text>
          <Text className={'text-[#ccc] mt-1'}>
          {t('Optez pour le montant qui vous arrange')}
          </Text>
        </View>
        <View>
          <DropDownComponent title={t('Je Suis')}/>
          <DropDownComponent title={t('Montant du prêt')}/>
          <DropDownComponent title={t('Durée')}/>
        </View>
        <View className={' mt-5'}>
          <Text className={'text-black font-bold'}>{t('Récapitulatif')}</Text>
          <SummaryComponent />
        </View>
      </View>
      <View className={'items-center'}>
        <ButtonRadius
        onPress={() => navigation.navigate('FirstTimeLoanEligibility')}
        buttonText={t('Je veux ce prêt')}
        background={true}
      />
      </View>
    </View>
  );
};

export default FirstTimeLoanRising;
