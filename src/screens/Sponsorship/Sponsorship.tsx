import env from '../../config/env';
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SponsorshipHeader from '../../containers/SponsorshipHeader';
import SideMenu from '../../containers/SideMenu';
import SponsorshipShapeSvg from '../../../assets/SponsorshipShapeSvg.svg';
import ShareSvg from '../../../assets/ShareSvg.svg';
import CopySvg from '../../../assets/CopySvg.svg';
import DashboardBottomTab from '../../containers/DashboardBottomTab';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../AppContext';

const Sponsorship = () => {
  const {t} = useTranslation()
  const {data} = useAppContext()
  const [menuActive, setMenuActive] = useState(false);

  const referralCode = data?.user?.referralCode || 'AXDFKYJR203';

  const handleActiveMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <View className={'flex-1 bg-black p-4'}>
      {menuActive ? (
        <SideMenu isOpen={menuActive} onClose={handleActiveMenu} />
      ) : null}
      <SponsorshipHeader onPress={handleActiveMenu} />
      <View className={'flex-row'}>
        <View>
          <Text className={' text-white font-bold text-lg'}>
          {t('Invitez un ami,')}
          </Text>
          <Text className={' text-[#ccc]'}>
          {t('Et gagnez tous les deux')}
            <Text className={'font-extrabold text-white'}>10 {env.CURRENCY_CODE}</Text>
          </Text>
          <Text className={'text-white font-bold text-lg mt-14'}>
          {t('Comment ça marche?')}
          </Text>
        </View>

        <View className={'ml-[50px] mt-[-25px]'}>
          <SponsorshipShapeSvg />
        </View>
      </View>

      <View className={'flex-1 mt-[-75px]'}>
        <View className={'flex-row items-center'}>
          <View
            className={
              'rounded-full h-14 w-14 bg-white items-center justify-center '
            }>
            <Text className={'text-black font-bold text-lg'}>1</Text>
          </View>
          <Text className={'text-[#ccc] text-sm mx-4'}>
          {t('Vous partagez votre code de\nparrainage avec vos amis')}
          </Text>
        </View>
        <View className={'border-l-2 border-gray-100 h-8 ml-7 border-dashed'} />
        <View className={'flex-row items-center'}>
          <View
            className={
              'rounded-full h-14 w-14 bg-white items-center justify-center '
            }>
            <Text className={'text-black font-bold text-lg'}>2</Text>
          </View>
          <Text className={'text-[#ccc] text-sm mx-4'}>
          {t('Vos amis souscrivent à un prêt Gini\navec votre code et gagnent')}
            <Text className={'font-extrabold text-white'}> 10 {env.CURRENCY_CODE}</Text>
          </Text>
        </View>
        <View className={'border-l-2 border-gray-100 h-8 ml-7 border-dashed'} />
        <View className={'flex-row items-center'}>
          <View
            className={
              'rounded-full h-14 w-14 bg-white items-center justify-center '
            }>
            <Text className={'text-black font-bold text-lg'}>3</Text>
          </View>
          <Text className={'text-[#ccc] text-sm mx-4'}>
          {t('Vous gagnez ')}
            <Text className={'font-extrabold text-white'}>10 {env.CURRENCY_CODE} </Text>
            {t('pour chacun\nde vos amis qui souscrit')}
          </Text>
        </View>
        <View
          className={
            'bg-[#3F3F3F] rounded-lg flex-row justify-between items-center h-14 mt-5 w-[95%] px-2'
          }>
          <TouchableOpacity
            className={
              'rounded-full border-[#817C7C] border-2 h-10 w-10 items-center justify-center'
            }>
            <ShareSvg />
          </TouchableOpacity>
          <Text className={'text-white font-bold text-base'}>{referralCode}</Text>
          <TouchableOpacity className={'border-2 border-[#817C7C] flex-row rounded-lg h-10 w-20 items-center justify-around'}>
            <CopySvg />
            <Text className={'text-[#817C7C]'}>{t('Copier')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DashboardBottomTab />
    </View>
  );
};

export default Sponsorship;
