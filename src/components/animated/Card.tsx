/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';

import LogoSvg from '../../../assets/LogoSvg.svg';
import ChipsSvg from '../../../assets/ChipsSvg.svg';
import ContactLessSvg from '../../../assets/ContactlessSvg.svg';
import LogoLanaSvg from '../../../assets/LogoLanaSvg.svg';
import MasterCardSvg from '../../../assets/MasterCardSvg.svg';

import { BlurView } from '@react-native-community/blur';





const Card = ({width = 347, data={firstName: 'Mouna', lastName: 'benani'}}) => {
  return (
    <View style={{position: 'relative' , width: width, height: 210, borderRadius: 50, overflow: 'hidden'}}>

    <BlurView style={{width: width, height: 219, borderRadius: 200}} blurAmount={10}>
      <View
        className={
          ' bg-[#785eb2] py-3 px-4 flex flex-col justify-between rounded-xl  h-[219px]'
        }
        style={{ width: width, opacity: 0.7}}>
       
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
            {data.firstName + ' ' + data.lastName}
          </Text>
        </View>

        <View className={' flex-row ml-2 justify-between items-center'}>
          <LogoLanaSvg />
          <MasterCardSvg />
        </View>
      </View>
      </BlurView>
      </View>
  );
};

export default Card;
