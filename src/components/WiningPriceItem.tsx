import {View, Text} from 'react-native';
import React from 'react';

import LogoSvg from '../../assets/LogoSvg.svg';
import RightWhiteArrow from '../../assets/RightWhiteArrow.svg'

const WiningPriceItem = () => {
  return (
    <View className={'flex-row items-center justify-between bg-[#393E41] h-[90px] px-2 rounded-lg my-1'}>
      <LogoSvg />
      <Text className={'text-white font-bold text-xs '}>
        Crédit gratuit 0%{'\n'}
        <Text className={'font-normal pt-3'}>500 DH maximum en crédit{'\n'}gratuit 0% </Text>
      </Text>
      <View className={'bg-[#1E1E1E] items-center justify-center w-[70px] h-[70px] rounded-lg '}>
        <Text className={'text-white text-center text-xs '}>En{'\n'}bénéficier</Text>
        <RightWhiteArrow />
      </View>
    </View>
  );
};

export default WiningPriceItem;
