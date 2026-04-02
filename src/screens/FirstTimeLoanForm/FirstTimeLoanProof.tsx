import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import LoanFormHeader from '../../containers/LoanFormHeader';
import ProofFilesUploader from '../../containers/ProofFilesUploader';
import ButtonRadius from '../../components/atoms/ButtonRadius';


import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import env from '../../config/env';

const FirstTimeLoanProof = () => {
  const {t} = useTranslation()
  const navigation = useNavigation();
  const [isUploaded, setIsUploaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleVerifyKyc = async () => {
    setLoading(true);
    try {
      // Mocking images as the uploader is currently a placeholder
      const mockImages = ['base64_image_data_1', 'base64_image_data_2'];

      // Note: env.API_BASE_URL defaults to http://localhost:5000/v1
      // Server routes use /api prefix.
      const apiEndpoint = env.API_BASE_URL.replace('/v1', '/api') + '/kyc/verify';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${userToken}` // Assuming auth middleware is handled
        },
        body: JSON.stringify({ images: mockImages })
      });

      const data = await response.json();

      if (response.ok && data.message === 'Identity successfully verified') {
        navigation.navigate('FirstTimeLoanCongratulations', {
          firstText: 'Contrats prêts',
          secondText: 'Votre prêt a été accordé. Votre contrat est disponible pour lecture et signature',
          nextScreen: 'FirstTimeLoanCoSigner',
          buttonText: 'Inviter mon co-signataire'
        });
      } else {
        Alert.alert(t('Erreur'), data.error || t('La vérification KYC a échoué.'));
      }
    } catch (error) {
      console.error('KYC Verification error:', error);
      Alert.alert(t('Erreur'), t('Impossible de contacter le serveur de vérification.'));
    } finally {
      setLoading(false);
    }
  };

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
         onPress={handleVerifyKyc}
          buttonText={loading ? t('Vérification...') : t('Vérifier mon identité')}
          background={true}
        />) : null}
      </View>
    </View>
  );
};

export default FirstTimeLoanProof;
