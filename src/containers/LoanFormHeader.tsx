import {View, TouchableOpacity} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

import LogoBlackSvg from '../../assets/LogoBlackSvg.svg';
import CloseSvg from '../../assets/CloseSvg.svg';
import LeftBlackArrowSvg from '../../assets/LeftBlackArrowSvg.svg';

interface LoanFormHeaderProps {
  progress: number;
  backArrow?: boolean;
}

const LoanFormHeader: React.FC<LoanFormHeaderProps> = ({progress, backArrow = true}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className={'w-full'}>
      <View className={'flex-row items-center justify-between'}>
        <LogoBlackSvg />
        <TouchableOpacity>
          <CloseSvg />
        </TouchableOpacity>
      </View>
      <View
        className={'bg-[#936EE3] h-2 mt-2 mb-4'}
        style={{width: progress}}
      />
      {backArrow ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftBlackArrowSvg />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default LoanFormHeader;
