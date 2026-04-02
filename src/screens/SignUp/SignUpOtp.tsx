import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';

import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

import CloseSvg from '../../../assets/CloseSvg.svg';
import MoneyFlySvg from '../../../assets/MoneyFlySvg.svg';
import TextInputComponent from '../../components/atoms/TextInputComponent';
import ButtonRadius from '../../components/atoms/ButtonRadius';
import { useAppContext } from '../../AppContext';
import axios from 'axios';
import { env } from '../../config/env';

const SignUpOtp: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, updateData } = useAppContext();
  const [otpCode, setOtpCode] = useState('');
  const [errors, setErrors] = useState<{otpCode?: string}>({});

  const handleChangeOTP = (text: string) => {
    setOtpCode(text);
  };

  const handleVerifyOTP = async () => {
    const newErrors: {otpCode?: string} = {};
    if (!otpCode) {
      newErrors.otpCode = 'OTP code is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post(`${env.API_BASE_URL}/api/v1/users/verifyotp`, {
         phone_number: data.signUpInfos.phoneNumber,
         otpCode: otpCode,
       });
      navigation.navigate('PinExplainer');
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      const message = error.response?.data?.message || error.message;
      setErrors({ otpCode: message || 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <View className={'flex-1 px-4 pt-6'}>
      <Header normal={false} />
      <View className={'flex-1'}>
        <TouchableOpacity className={'self-end pt-4'} onPress={() => navigation.navigate('SignIn')}>
          <CloseSvg />
        </TouchableOpacity>
        <View className={'mt-6'}>
          <Text className={'text-black font-bold text-2xl'}>
            {t('Création de compte')}
          </Text>
          <View className={'flex-row items-center'}>
            <Text className={'text-[#626262] text-sm'}>
              {t(`Un pas de plus vers l'indépendance financière`)}
            </Text>
            <MoneyFlySvg />
          </View>
        </View>
        <View className={'mt-4'}>
          <TextInputComponent Title={t('Insérez le code OTP')} onChangeText={handleChangeOTP} />
          {errors.otpCode && <Text style={{ color: 'red' }}>{errors.otpCode}</Text>}
          <View className={'flex-row justify-end mt-4'}>
            <TouchableOpacity onPress={handleVerifyOTP}>
              <Text className={'font-medium text-sm text-[#626262]'}>{t('Renvoyer le code OTP')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className={'items-center mt-4'}>
        <ButtonRadius onPress={handleVerifyOTP} buttonText={t('Vérifier mon numéro de téléphone')} background={true} />
      </View>
    </View>
  );
};

export default SignUpOtp;
