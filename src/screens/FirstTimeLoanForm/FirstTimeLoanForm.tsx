import { View, Text } from 'react-native'
import React from 'react'
import LoanFormHeader from '../../containers/LoanFormHeader'
import FormuleAvailable from '../../containers/FormuleAvailable'
import { useTranslation } from 'react-i18next'

const FirstTimeLoanForm = () => {
  const {t} = useTranslation()
  return (
    <View className={'px-4 pt-6'}>
      <LoanFormHeader progress={50} backArrow={false}/>
      <View className={'mt-8'}>
        <Text className={'text-black font-bold text-2xl'}>{t('Choix de la formule')}</Text>
        <Text className={'text-[#ccc] mt-1'}>{t('Choisissez un type de prêt Gini:')}</Text>
      </View>
      <View className={'mt-5'}>
        <FormuleAvailable next={'FirstTimeLoanRising'}/>
      </View>
    </View>
  )
}

export default FirstTimeLoanForm
