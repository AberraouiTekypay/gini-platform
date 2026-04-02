import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import HeaderWithArrow from '../../components/HeaderWithArrow';
import SideMenu from '../../containers/SideMenu';
import WiningPriceItem from '../../components/WiningPriceItem';
import SVGLinearGradientProgressBar from '../../containers/LoanProgressBar';
import LoansBottomButtons from '../../containers/LoansBottomButtons';

const Loans = () => {
  const [menuActive, setMenuActive] = useState(false);

  const handleActiveMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <View className={'flex-1 bg-black px-4 pt-6'}>
      {menuActive ? (
        <SideMenu isOpen={menuActive} onClose={handleActiveMenu} />
      ) : null}
      <View className={'w-full'}>
        <HeaderWithArrow onPress={handleActiveMenu} />
      </View>
      <View className={'items-center mt-[-8px]'}>
        <SVGLinearGradientProgressBar percentage={50} />
      </View>
      <View className={'items-center my-3'}>
        <Text className={'text-[#F1B31C]'}>
          Vous avez augmenté votre score de:{'  '}
          <Text className={'text-[#F1B31C] font-bold'}>+22 points</Text>
        </Text>
      </View>
      <View
        className={
          'flex-row items-center justify-between bg-[#936EE3] rounded-lg w-full h-[80px] px-5 mt-6'
        }>
        <Text className={'text-white '}>Repayer mon prêt</Text>
        <View className={'items-end'}>
          <Text className={'text-white'}>Montant dû</Text>
          <Text className={'text-white font-bold text-lg'}>309.00 DH</Text>
        </View>
      </View>
      <View className={'gap-5 mt-4'}>
        <Text className={'text-white text-sm'}>
          Plus vous repayez, plus vous gagnez :
        </Text>
        <ScrollView className={''}>
          <WiningPriceItem />
          <WiningPriceItem />
          <WiningPriceItem />
          <WiningPriceItem />
          <WiningPriceItem />
          <WiningPriceItem />
        </ScrollView>
      </View>
      <View className={'absolute self-center w-full bottom-0 h-[150px]'}>
        <LinearGradient
          colors={['#1E201900', 'black']}
          style={styles.gradient}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <LoansBottomButtons />
        </LinearGradient>
      </View>
    </View>
  );
};

export default Loans;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'flex-end'
  },
});
