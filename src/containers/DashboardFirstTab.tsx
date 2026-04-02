import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import FactureSvg from '../../assets/FactureSvg.svg';
import MoneySvg from '../../assets/MoneySvg.svg';
import QrCodeSvg from '../../assets/QrCodeSvg.svg';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const DashboardFirstTab = () => {
  const {t} = useTranslation()
  const navigation = useNavigation()
  return (
    <View className={'flex-row justify-around my-7'}>
    <View className={'gap-1 items-center'}>
      <TouchableOpacity
        onPress={() => navigation.navigate('FirstTimeLoanForm')}
        className={
          'items-center justify-center bg-[#393E41] rounded-full h-14 w-14'
        }>
        <FactureSvg />
      </TouchableOpacity>
      <Text className={'text-[#ccc] text-center leading-5'}>
      {t('Payer une\nfacture')}
      </Text>
    </View>
    <View className={'gap-1 items-center'}>
      <TouchableOpacity
        className={
          'items-center justify-center bg-[#393E41] rounded-full h-14 w-14'
        }>
        <MoneySvg />
      </TouchableOpacity>
      <Text className={'text-[#ccc] text-center leading-5'}>
        {t('Envoyer de\nl’argent')}
      </Text>
    </View>
    <View className={'gap-1 items-center'}>
      <TouchableOpacity
      onPress={() => navigation.navigate('QrExplainer')}
        className={
          'items-center justify-center bg-[#393E41] rounded-full h-14 w-14'
        }>
        <QrCodeSvg />
      </TouchableOpacity>
      <Text className={'text-[#ccc] text-center leading-5'}>
        {t('Paiement\nmarchand')}
      </Text>
    </View>
  </View>
  )
}

export default DashboardFirstTab