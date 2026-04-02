import {View, Text, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';

//import components
import Header from '../../components/Header';

// import the SVG as Components
import BackGroundSvg from '../../../assets/BackGroundSvg.svg';
import HandSvg from '../../../assets/HandSvg.svg';


import Footer from '../../components/Footer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const WalkThrough = () => {
  return (
    <View className={' flex-1 justify-between bg-[#1E2019] px-4 pt-6'}>
      <Header normal={true}/>
      <View
        className={
          'absolute  justify-center items-center top-[35%] bottom-[65%] right-0 left-0'}>
        <BackGroundSvg />
      </View>
      <View className={'absolute  right-[30%] bottom-3'}>
        <HandSvg width={screenWidth - 50} height={screenHeight}/>
      </View>
      <Footer walkthrough={true}/>
    </View>
  );
};

export default WalkThrough;
