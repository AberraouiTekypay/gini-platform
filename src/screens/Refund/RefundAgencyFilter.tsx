import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';

import HeaderWithArrow from '../../components/HeaderWithArrow';
import SideMenu from '../../containers/SideMenu';
import ButtonNonRadius from '../../components/atoms/ButtonNonRadius';

import MarkerSvg from '../../../assets/MarkerSvg.svg';
import DropDownComponent from '../../components/atoms/DropDownComponent';
import AgencyItem from '../../components/atoms/AgencyItem';
import { useTranslation } from 'react-i18next';

const RefundAgencyFilter = () => {
  const {t} = useTranslation()
  const [menuActive, setMenuActive] = useState(false);

  const handleActiveMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleGeoLocalisation = () => {};

  return (
    <View className={'flex-1 items-center bg-black px-4 pt-6'}>
      {menuActive ? (
        <SideMenu isOpen={menuActive} onClose={handleActiveMenu} />
      ) : null}
      <View className={'w-full mb-10'}>
        <HeaderWithArrow onPress={handleActiveMenu} />
      </View>
      
      <ButtonNonRadius
        buttonText={t('Activez ma géolocalisation ')}
        onPress={handleGeoLocalisation}
        svgComponent={MarkerSvg}
      />
      <View className={'w-full mt-2'}>
      <DropDownComponent title={t('Ville')} isTitleWhite={true} />
      <DropDownComponent title={t('Partenaire')} isTitleWhite={true} />
      </View>

      <ScrollView className={'self-start mt-4 w-full'}>
        <Text className={' text-white text-bold text-base mb-4'}>{t('Resultas')}</Text>
        <AgencyItem adress={'Agence HassanII'} />
        <View className={'bg-[#ccc] h-[1px] my-3'} />
        <AgencyItem adress={'Agence Ghandi'} />
        <View className={'bg-[#ccc] h-[1px] my-3'} />
        <AgencyItem adress={'Agence Maarif'} />
        <View className={'bg-[#ccc] h-[1px] my-3'} />
        <AgencyItem adress={'Agence CFC'} />
        <View className={'bg-[#ccc] h-[1px] my-3'} />
        <AgencyItem adress={'Agence HassanII'} />
        <View className={'bg-[#ccc] h-[1px] my-3'} />
        <AgencyItem adress={'Agence Ghandi'} />
        <View className={'bg-[#ccc] h-[1px] my-3'} />
        <AgencyItem adress={'Agence Maarif'} />
        <View className={'bg-[#ccc] h-[1px] my-3'} />
        <AgencyItem adress={'Agence CFC'} />
      </ScrollView>
    </View>
  );
};

export default RefundAgencyFilter;
