import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import RingSvg from '../../assets/RingSvg.svg';
import CoinsWhiteSvg from '../../assets/CoinsWhiteSvg.svg';
import ReceiptSvg from '../../assets/ReceiptSvg.svg';
import ScoreSvg from '../../assets/ScoreSvg.svg';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/types';

const LoansBottomButtons = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
      <View className={'flex-row justify-between items-center self-end w-full px-1 '}>
        <View className={'items-center gap-1'}>
          <TouchableOpacity
            className={
              'bg-[#393E41] w-14 h-14 rounded-full items-center justify-center'
            }>
            <ScoreSvg />
          </TouchableOpacity>
          <Text className={'text-[#bbbcba] text-sm'}>Mon Score</Text>
        </View>
        <View className={'items-center gap-1'}>
          <TouchableOpacity
            className={
              'bg-[#393E41] w-14 h-14 rounded-full items-center justify-center'
            }>
            <ReceiptSvg />
          </TouchableOpacity>
          <Text className={'text-[#bbbcba] text-sm'}>Historique</Text>
        </View>
        <View className={'items-center gap-1'}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FirstTimeLoanForm')}
            className={
              'bg-[#393E41] w-14 h-14 rounded-full items-center justify-center'
            }>
            <CoinsWhiteSvg />
          </TouchableOpacity>
          <Text className={'text-[#bbbcba] text-sm'}>Emprunter</Text>
        </View>
        <View className={'items-center gap-1'}>
          <TouchableOpacity
            className={
              'bg-[#393E41] w-14 h-14 rounded-full items-center justify-center'
            }>
            <RingSvg />
          </TouchableOpacity>
          <Text className={'text-[#bbbcba] text-sm'}>Assistance</Text>
        </View>
      </View>
  );
};

export default LoansBottomButtons;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyItems: 'end'
    
  },
});
