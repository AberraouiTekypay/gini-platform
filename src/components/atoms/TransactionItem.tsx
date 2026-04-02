import { View, Text } from 'react-native'
import React from 'react'

import MoneyRecieveSvg from '../../../assets/MoneyRecieveSvg.svg'

const TransactionItem = () => {
  return (
    <View className={'flex-row items-center justify-between'}>
      <MoneyRecieveSvg />
      <Text className={'text-[#9B9B9A] font-semibold'}>Prélévement sur wallet{'\n'}<Text className={'font-normal'}>06/04/2023</Text></Text>
      <Text className={'text-[#9B9B9A] font-semibold'}>-309.00 DH</Text>
    </View>
  )
}

export default TransactionItem