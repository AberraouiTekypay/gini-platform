import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface ButtonNonRadiusProps {
  buttonText: string;
  onPress: () => void;
  svgComponent?: React.ComponentType | null;
}

const ButtonNonRadius: React.FC<ButtonNonRadiusProps> = ({ buttonText, onPress, svgComponent = null }) => {
  const SVGcomponent = svgComponent;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}>
      {SVGcomponent && <SVGcomponent />}
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#936EE3',
    borderRadius: 8,
    width: '100%',
    height: 74,
    gap: 2,
  },
  buttonText: {
    color: 'white',
  },
});

export default ButtonNonRadius;
