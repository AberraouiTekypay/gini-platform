import {View, Text} from 'react-native';
import React from 'react';
import LoanFormHeader from '../../containers/LoanFormHeader';
import TextInputComponent from '../../components/atoms/TextInputComponent';
import ButtonRadius from '../../components/atoms/ButtonRadius';
import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const FirstTimeLoanCoSigner = () => {
  const {t} = useTranslation()
  const navigation = useNavigation();
  const handleChangeText = () => {};

  return (
    <View className={'flex-1 px-4 pt-6'}>
      <LoanFormHeader progress={300} />
      <View className={'mt-6'}>
        <Text className={'text-black font-bold text-2xl'}>
        {t('Invitez votre co-signataire')}
        </Text>
        <Text className={'mt-1 text-[#ccc]'}>
        {t('Insérez les informations de votre co-signataire')}
        </Text>
      </View>
      <View className={'flex-1'}>
        <TextInputComponent Title={t('Nom')} onChangeText={handleChangeText} />
        <TextInputComponent Title={t('Prénom')} onChangeText={handleChangeText} />
        <TextInputComponent
          Title={t('Numéro de téléphone')}
          onChangeText={handleChangeText}
        />
        <View className={'items-center justify-center gap-8 mt-5'}>
          <Text className={'text-[#ccc]'}>{t('Ou sélectionnez depuis')}</Text>
          <ButtonRadius
            buttonText={t('liste de contacts')}
            onPress={() => {}}
            background={false}
          />
        </View>
      </View>
      <View>
        <ButtonRadius
          onPress={() =>
            navigation.navigate('FirstTimeLoanCongratulations', {
              firstText: 'Co-signature',
              secondText: 'Votre co-signataire a rejoint Gini, vous pouvez\nmaintenant procéder à la signature du contrat',
              nextScreen: 'FirstTimeLoanContract',
              buttonText: 'Lire mon contrat',
            })
          }
          buttonText={t('Envoyer l’invitation')}
          background={true}
        />
      </View>
    </View>
  );
};

export default FirstTimeLoanCoSigner;
