import {Text, TouchableOpacity, ColorValue} from 'react-native';
import React from 'react';

interface ButtonRadiusProps {
  buttonText: string;
  onPress: () => void;
  background: boolean;
  svgComponent?: React.FC<any> | null;
}

const ButtonRadius: React.FC<ButtonRadiusProps> = ({
  buttonText,
  onPress,
  background,
  svgComponent = null,
}) => {
  const SVGcomponent = svgComponent;

  return (
    <TouchableOpacity
      className={
        ' flex-row items-center justify-center border-2 border-[#936EE3] rounded-full w-[350px] h-[56px] my-1'
      }
      style={{backgroundColor: (background ? '#936EE3' : undefined) as ColorValue | undefined}}
      onPress={onPress}>
      {SVGcomponent && <SVGcomponent />}
      <Text
        className={
          background ? 'text-white text-sm' : 'text-[#936EE3] text-sm mx-2'
        }>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonRadius;
