import {View, Text} from 'react-native';
import React, {useState} from 'react';
import LoanFormHeader from '../../containers/LoanFormHeader';
import ProofFilesUploader from '../../containers/ProofFilesUploader';
import ButtonRadius from '../../components/atoms/ButtonRadius';


import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const FirstTimeLoanProof = () => {
  const {t} = useTranslation()
  const navigation = useNavigation();
  const [isUploaded, setIsUploaded] = useState(false)

  return (
    <View className={'flex-1 px-4 pt-6'}>
      <LoanFormHeader progress={isUploaded ? 240 : 170} />
      <View className={'mt-6'}>
        <Text className={'text-black font-bold text-2xl'}>
        {t('Vérification de l’identité')}
        </Text>
        <Text className={'mt-1 text-[#ccc]'}>
        {t('Fournissez les documents justificatifs suivants')}
        </Text>
      </View>
      <View className={'flex-1 mt-4'}>
        <ProofFilesUploader setIsUploaded={setIsUploaded} Texts={{title: 'Pièce d’identité', mainText: 'Scan de la CNIE ou carte de\nséjour valide en récto verso', info: true}}/>
        <ProofFilesUploader setIsUploaded={setIsUploaded} Texts={{title: 'Selfie biométrique', mainText: 'Selfie utilisé pour vérifier que vous\n n’êtes pas un robot', info: false}}/>
      </View>
      <View className={'items-center'}>
        {isUploaded ? (<ButtonRadius
         onPress={() => {
          navigation.navigate('FirstTimeLoanCongratulations', {
            firstText: 'Contrats prêts',
            secondText: 'Votre prêt a été accordé. Votre contrat est\disponible pour lecture et signature',
            nextScreen: 'FirstTimeLoanCoSigner',
            buttonText: 'Inviter mon co-signataire'
          });
        }}
          buttonText={t('Vérifier mon identité')}
          background={true}
        />) : null}
      </View>
    </View>
  );
};

export default FirstTimeLoanProof;
