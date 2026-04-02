import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import IndicatorSvg from '../../../assets/IndicatorSvg.svg';
import MapMarkerSvg from '../../../assets/MapMarkerSvg.svg';

interface AgencyItemProps {
  adress: string;
}

const AgencyItem: React.FC<AgencyItemProps> = ({adress}) => {
  return (
    <View className={'flex-row items-center justify-between w-full'}>
      <View className={'flex-row items-center gap-4'}>
      <IndicatorSvg />
      <Text className={'text-[#ccc] text-bold text-base'}>{adress}</Text>
      </View>
      <TouchableOpacity className={'flex-row items-center gap-2'}>
        <Text className={'text-white'}>Directions</Text>
        <MapMarkerSvg />
      </TouchableOpacity>
    </View>
  );
};

export default AgencyItem;
