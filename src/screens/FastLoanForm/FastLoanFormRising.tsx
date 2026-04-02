import { View, Text } from 'react-native'
import React from 'react'
import LoanFormHeader from '../../containers/LoanFormHeader'
import { useTranslation } from 'react-i18next'
import DropDownComponent from '../../components/atoms/DropDownComponent'
import SummaryComponent from '../../components/SummaryComponent'
import ButtonRadius from '../../components/atoms/ButtonRadius'
import { useNavigation } from '@react-navigation/native'

const FastLoanFormRising = () => {
  const navigation = useNavigation()
  const {t} = useTranslation()

  return (
    <View className={'flex-1 px-4 pt-6'}>
      <LoanFormHeader progress={100} />
      <View className={'mt-5'}>
          <Text className={'text-black font-bold text-2xl'}>
          {t('Choix du montant')}
          </Text>
          <Text className={'text-[#ccc] mt-1'}>
          {t('Optez pour le montant qui vous arrange')}
          </Text>
        </View>
        <View>
          <DropDownComponent title={'Montant du prêt'} />
          <DropDownComponent title={'Durée'} />
        </View>
        <View className={'flex-1 mt-5'}>
          <Text className={'text-black font-bold'}>{t('Récapitulatif')}</Text>
          <SummaryComponent />
        </View>
        <View className={'items-center'}>
          <ButtonRadius onPress={() => navigation.navigate('FastLoanFormPin')} buttonText={t('Je veux ce prêt')} background={true} />
        </View>
    </View>
  )
}

export default FastLoanFormRising
