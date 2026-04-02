import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import HeaderWithArrow from '../../components/HeaderWithArrow';
import SideMenu from '../../containers/SideMenu';

import GiniPaySvg from '../../../assets/GiniPaySvg.svg';
import LoanCardInfos from '../../components/animated/LoanCardInfos';
import RefundMiddleButtons from '../../containers/RefundMiddleButtons';
import TransactionItem from '../../components/atoms/TransactionItem';
import RightWhiteArrow from '../../../assets/RightWhiteArrow.svg'
import { BlurView } from '@react-native-community/blur';
import { useTranslation } from 'react-i18next';


const Refund = () => {
  const {t} = useTranslation()
  const [menuActive, setMenuActive] = useState(false);

  const handleActiveMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <View className={'flex-1 items-center bg-black px-4 pt-6'}>
      {menuActive ? (
        <SideMenu isOpen={menuActive} onClose={handleActiveMenu} />
      ) : null}
     <View className={'w-full'}>
     <HeaderWithArrow onPress={handleActiveMenu} />
      <GiniPaySvg />
     </View>
      <View className={' my-3'}>
      <LoanCardInfos />
      </View>
      <RefundMiddleButtons />
      <View className={'w-[347px] mt-4'}>
        <View className={'flex-row justify-between  items-center'}>
          <Text className={'text-white font-medium'}>{t('Derniers remboursements')}</Text>
          <TouchableOpacity className={'flex-row items-center gap-2'}>
            <Text className={'text-white'}>{t('Tout voir')}</Text>
            <RightWhiteArrow />
          </TouchableOpacity>
        </View>
        <View className={'mt-3'}>
            <TransactionItem />
            <View className={'w-full h-[1px] bg-[#9B9B9A] my-2'}/>
            <TransactionItem />
        </View>
      </View>
    </View>
  );
};

export default Refund;
