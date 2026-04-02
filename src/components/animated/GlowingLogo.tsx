import {View, StyleSheet, Animated, Easing} from 'react-native';
import React, {useRef, useEffect} from 'react';
// import Animated, {
//   useAnimatedStyle,
//   withRepeat,
//   withSequence,
//   withTiming,
// } from 'react-native-reanimated';

const styles = StyleSheet.create({
  glowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    bottom: 0,
    left: 0,
    right: 4,
  },
});

import LogoSvg from '../../../assets/LogoSvg.svg';

const GlowingLogo = () => {
  const animValue1 = useRef(new Animated.Value(0)).current;
  const animValue2 = useRef(new Animated.Value(0)).current;
  const animValue3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    const duration = 500; // Duration for each animation step in milliseconds

    const animation1 = Animated.timing(animValue1, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    const animation2 = Animated.timing(animValue2, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    const animation3 = Animated.timing(animValue3, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    // Sequence the animations with delays
    Animated.sequence([
      animation1,
      animation2,
      animation3,
    ]).start(() => {
      animValue1.setValue(0);
      animValue2.setValue(0);
      animValue3.setValue(0);
      // Restart the animation
      startAnimation();
    });
  };

  const animatedStyle1 = {
    width: animValue1.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '50%'],
    }),
    height: animValue1.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '50%'], // Change this output range to control the final size
    }),
  };

  const animatedStyle2 = {
    width: animValue2.interpolate({
      inputRange: [0, 1],
      outputRange: ['50%', '70%'], // Change this output range to control the final size
    }),
    height: animValue2.interpolate({
      inputRange: [0, 1],
      outputRange: ['50%', '70%'],
    }),
  };

  const animatedStyle3 = {
    width: animValue3.interpolate({
      inputRange: [0, 1],
      outputRange: ['70%', '100%'], // Change this output range to control the final size
    }),
    height: animValue3.interpolate({
      inputRange: [0, 1],
      outputRange: ['70%', '100%'], // Change this output range to control the final size
    }),
  };

  return (
    <View
      style={{
        width: 300,
        height: 300,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={{
          ...animatedStyle3,
          backgroundColor: '#fdf7d9',
          borderRadius: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            ...animatedStyle2,
            backgroundColor: '#fae999',
            borderRadius: 115,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.View
            style={{
              ...animatedStyle1,
              backgroundColor: '#f7da59',
              borderRadius: 115,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LogoSvg />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default GlowingLogo;
