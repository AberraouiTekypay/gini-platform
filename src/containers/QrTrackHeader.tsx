import {View, Text} from 'react-native';
import React from 'react';

import LogoBlackSvg from '../../assets/LogoBlackSvg.svg';
import CloseSvg from '../../assets/CloseSvg.svg';
import CheckGray from '../../assets/CheckGray.svg';
import CheckWhite from '../../assets/CheckWhite.svg'

interface QrTrackHeaderProps {
  progress: number;
}

const QrTrackHeader: React.FC<QrTrackHeaderProps> = ({progress}) => {
  return (
    <View className={'flex gap-4'}>
      <LogoBlackSvg />
      <View className={'flex-row items-center'}>
        <View className={'border-2 border-[#393e41] rounded-full w-14 h-14 items-center justify-center'}>
          <CloseSvg />
        </View>
        <View className={'h-1 w-10 bg-[#393e41]'} />
        <Text className={'text-black mx-2'}>Scanner</Text>
        <View className={'h-1 w-10'} style={progress > 0 ? {backgroundColor: '#393e41' } : {backgroundColor: '#ccc'}}/>
        <Text className={'mx-2'} style={progress > 0 ? {color: '#393e41' } : {color: '#ccc'}}>Payer</Text>
        <View className={'h-1 w-16'} style={progress > 1 ? {backgroundColor: '#393e41' } : {backgroundColor: '#ccc'}}/>
        <View className={'border-2 rounded-full w-8 h-8 items-center justify-center'} 
        style={progress > 1 ? {borderColor: '#393e41', backgroundColor: '#393e41'} : {borderColor: '#ccc'}}>
            {progress > 1 ? <CheckWhite /> : <CheckGray />}
        </View>
      </View>
    </View>
  );
};

export default QrTrackHeader;
