import { View, Text } from 'react-native'
import React from 'react'
import LoanFormHeader from '../../containers/LoanFormHeader'
import TextInputComponent from '../../components/atoms/TextInputComponent'
import ButtonRadius from '../../components/atoms/ButtonRadius'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const FirstTimeLoanPairingCode = () => {
    const {t} = useTranslation()
    const navigation = useNavigation()
    const handleChangeText = () => {}
  return (
    <View className={'flex-1 px-4 pt-6'}>
        <LoanFormHeader progress={350} />
        <View className={'mt-6'}>
            <Text className={'text-black font-bold text-2xl'}>{t('Code de parrainage')}</Text>
            <Text className={'mt-1 text-[#ccc]'}>{t('Avez-vous un  code de parrainage ?')}</Text>
        </View>
        <View className={'flex-1'}>
            <TextInputComponent Title={t('Insérez le code')} onChangeText={handleChangeText} />
        </View>
        <View className={'items-center'}>
            <ButtonRadius onPress={() => {}} buttonText={t('Non, je n’ai pas de code')} background={false} />
            <ButtonRadius onPress={() => navigation.navigate('FirstTimeLoanApproved')} buttonText={t('Activer mon code')} background={true} />
        </View>
    </View>
  )
}

export default FirstTimeLoanPairingCode
