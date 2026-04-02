import {View, Text, Animated, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';

import LogoSvg from '../../../assets/LogoSvg.svg';
import ChipsSvg from '../../../assets/ChipsSvg.svg';
import ContactLessSvg from '../../../assets/ContactlessSvg.svg';
import LogoLanaSvg from '../../../assets/LogoLanaSvg.svg';
import MasterCardSvg from '../../../assets/MasterCardSvg.svg';

import {BlurView} from '@react-native-community/blur';

const AnimatedCard = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = setTimeout(() => {
    const rotate1 = Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1500, // Rotate 180 degrees in 1.5 seconds
      useNativeDriver: true,
    });

    const rotate2 = Animated.timing(rotateAnim, {
      toValue: 2,
      duration: 2500,
      useNativeDriver: true,
    });

    const rotate3 = Animated.timing(rotateAnim, {
      toValue: 3,
      duration: 2500,
      useNativeDriver: true,
    });

    const rotate4 = Animated.timing(rotateAnim, {
      toValue: 4,
      duration: 2000,
      useNativeDriver: true,
    });

    const rotate5 = Animated.timing(rotateAnim, {
      toValue: 5,
      duration: 2000,
      useNativeDriver: true,
    });

    const rotate6 = Animated.timing(rotateAnim, {
      toValue: 6,
      duration: 2000,
      useNativeDriver: true,
    });

    const sequence = Animated.sequence([
      rotate1,
      rotate2,
      rotate3,
      rotate4,
      rotate5,
      rotate6,
    ]);

    rotate1.start();
    rotate2.start();
    rotate3.start();
    rotate4.start();
    rotate5.start();
    rotate6.start();

    return () => {
      sequence.stop();
    };
  }, 1500);
  }, [rotateAnim]);

  const rotateStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6],
          outputRange: [
            '75deg',
            '-20deg',
            '-20deg',
            '20deg',
            '-10deg',
            '10deg',
            '0deg',
          ],
        }),
      },
    ],
  };

  return (
    
    <Animated.View className={'pt-4'} style={[rotateStyle]}>
      <BlurView
      style={{height: 219, width: 347, borderRadius: 12}}
      blurAmount={10}
      >
      <View
        className={
          ' bg-[#785eb2] py-3 px-4 justify-between rounded-xl w-[347px] h-[219px]'
        }
        style={{opacity: 0.5}}>
        <View className={'w-full flex items-end'}>
          <LogoSvg />
        </View>

        <View
          className={'w-full flex flex-row justify-between px-2 items-center'}>
          <View className={'flex-row justify-center items-center gap-2'}>
            <ChipsSvg />
            <ContactLessSvg />
          </View>
          <Text className={'text-white text-2xl font-semibold '}>
            Mouna Benani
          </Text>
        </View>

        <View className={' flex-row ml-2 justify-between items-center'}>
          <LogoLanaSvg />
          <MasterCardSvg />
        </View>
      </View>
      </BlurView>
    </Animated.View>
  );
};

export default AnimatedCard;

