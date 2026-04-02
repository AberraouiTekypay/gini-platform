import {View, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

import BackGroundSvg from '../../../assets/BackGroundSvg.svg';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnimatedCard from '../../components/animated/AnimatedCard';


const SecondWalkThrough: React.FC = () => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotate, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const rotateStyle = {
    transform: [
      {
        rotateX: rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  return (
    <View className={'flex-1 justify-between bg-[#1E2019] pt-6 px-4'}>
      <Header normal={true}/>
      <Animated.View
        className={
          'absolute  justify-center items-center top-[40%] bottom-[70%] right-0 left-0'
        }
        style={[rotateStyle]}>
        <BackGroundSvg />
      </Animated.View>
      <View className={'absolute top-[28%] right-[5%]'}>
        <AnimatedCard />
      </View>
      <Footer walkthrough={false}/>
    </View>
  );
};

export default SecondWalkThrough;
