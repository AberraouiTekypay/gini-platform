import { View, TouchableOpacity } from 'react-native'
import React from 'react'

import LeftArrowSvg from '../../assets/LeftArrowSvg.svg'
import AppsSvg from '../../assets/AppsSvg.svg';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface HeaderWithArrowProps {
  onPress: () => void;
}

const HeaderWithArrow: React.FC<HeaderWithArrowProps> = ({onPress}) => {
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View className={'flex-row justify-between items-center'}>
        

    <TouchableOpacity className={'flex'} onPress={() => navigation.goBack()}>
      <LeftArrowSvg />
    </TouchableOpacity>
    <TouchableOpacity
    onPress={onPress}
      className={'p-2 border-2 border-[#ccc] rounded-full border-solid'}>
      <AppsSvg />
    </TouchableOpacity>
  </View>
  )
}

export default HeaderWithArrow