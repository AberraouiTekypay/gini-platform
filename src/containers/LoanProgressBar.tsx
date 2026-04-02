import React from 'react';
import {View, Dimensions, Text} from 'react-native';
import Svg, {Path, LinearGradient, Stop, Defs} from 'react-native-svg';
import GiniscoreSvg from '../../assets/GiniscoreSvg.svg';
const {width, height} = Dimensions.get('window');

interface ArchedProgressBarProps {
  percentage: number;
}

const ArchedProgressBar: React.FC<ArchedProgressBarProps> = ({percentage}) => {
  const strokeWidth = 12;
  const center = width / 2;
  const r = (width - strokeWidth) / 2 - 40;
  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI; // Calculate the end angle based on the percentage
  const x1 = center - r * Math.cos(startAngle);
  const y1 = -r * Math.sin(startAngle) + center;
  const x2 = center - r * Math.cos(endAngle);
  const y2 = -r * Math.sin(endAngle) + center;

  const endAngleTwo = startAngle + (2 * Math.PI * percentage) / 200;
  const x3 = center + r * Math.cos(endAngleTwo);
  const y3 = r * Math.sin(endAngleTwo) + center;

  const rawPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
  const SecondRawPath = `M ${x3} ${y3} A ${r} ${r} 0 ${
    endAngleTwo > Math.PI * 2 ? 1 : 0
  } 0 ${x2} ${y2}`;

  return (
    <View className={'flex items-center w-full justify-center'}>
      <Svg width={width} height={height * 0.26}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#936EE3" />
            <Stop offset="100%" stopColor="#FFE16E" />
          </LinearGradient>
        </Defs>
        <Path
          d={rawPath}
          fill="none"
          stroke="gray"
          strokeLinecap="round"
          strokeWidth={1}
        />
        <Path
          d={SecondRawPath}
          fill="none"
          stroke="url(#gradient)"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
      <View className={'absolute items-center gap-1 bottom-8'}>
        <Text className={'text-[#FFD70D] text-4xl font-bold'}>274</Text>
        <Text className={'text-white'}>
          Votre score est: <Text className={'font-bold'}>Bien</Text>
        </Text>
      </View>
      <View className={'absolute bottom-0'}><GiniscoreSvg /></View>
    </View>
  );
};

export default ArchedProgressBar;
