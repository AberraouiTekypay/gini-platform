import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LoanFormHeader from '../../containers/LoanFormHeader'
import TextInputComponent from '../../components/atoms/TextInputComponent'
import ButtonRadius from '../../components/atoms/ButtonRadius'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const FirstTimeLoanSignature = () => {
    const {t} = useTranslation()
    const navigation = useNavigation()
    const handleChangeText = () => {}
  return (
    <View className={'flex-1 px-4 pt-6'}>
        <LoanFormHeader progress={350} />
        <View className={'mt-6'}>
            <Text className={'text-black font-bold text-2xl'}>{t('Signature de contrat')}</Text>
            <Text className={'mt-1 text-[#ccc]'}>{t('Inserez le code reçu afin de signer le contrat')}</Text>
        </View>
        
        <View className={'flex-1'}>
            <TextInputComponent Title={'Insérez le code OTP'} onChangeText={handleChangeText} />
            <TouchableOpacity className={'self-end'}>
            <Text className={'text-[#ccc]'}>{t('Renvoyer le code OTP')}</Text>
            </TouchableOpacity>
        </View>
        
        <View className={'items-center'}>
            <ButtonRadius onPress={() => navigation.navigate('FirstTimeLoanPairingCode')} buttonText={t('Signer')} background={true} />
        </View>
    </View>
  )
}

export default FirstTimeLoanSignature
