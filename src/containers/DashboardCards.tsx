import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useState, useRef} from 'react';

import Card from '../components/animated/Card';
import CardInfos from '../components/animated/CardInfos';
import LoanCardInfos from '../components/animated/LoanCardInfos';

const DashboardCards = () => {
  const [loanCardInfos, setLoanCardInfos] = useState(false);
  const [cardInfosActive, setCardInfosActive] = useState(false);
  const rotate = useRef(new Animated.Value(0)).current;

  const handleClick = () => {
    setCardInfosActive(!cardInfosActive);

    Animated.timing(rotate, {
      toValue: cardInfosActive ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

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
    <View className={'items-center justify-center'}>
      <Animated.View
        className={loanCardInfos ? undefined : 'absolute z-10 bottom-5'}
        style={[rotateStyle]}>
        <Card width={!loanCardInfos ? 347 : 330} />
        <Animated.View
          style={[
            rotateStyle,
            {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
          ]}>
          {cardInfosActive && <CardInfos width={!loanCardInfos ? 347 : 330} />}
        </Animated.View>
      </Animated.View>

      <TouchableOpacity
        onPress={() => setLoanCardInfos(!loanCardInfos)}
        className={loanCardInfos ? 'absolute z-10 bottom-5' : undefined}>
        <LoanCardInfos width={loanCardInfos ? 347 : 330} />
      </TouchableOpacity>

      {loanCardInfos ? null : (
        <TouchableOpacity
          onPress={handleClick}
          className={
            'flex-row justify-around items-center rounded-full p-2 bg-[#393E41] w-[50%] mt-[-30px] z-20'
          }>
          <Text className={'text-white'}>
            {cardInfosActive
              ? 'Cacher les informations'
              : 'Voir les informations'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DashboardCards;
