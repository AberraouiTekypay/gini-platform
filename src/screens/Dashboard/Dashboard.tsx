import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import ArrowRightSvg from '../../../assets/ArrowRightSvg.svg';
import AlertSvg from '../../../assets/AlertSvg.svg';
import LocalizerSvg from '../../../assets/LocalizerSvg.svg';

import SideMenu from '../../containers/SideMenu';
import DashboardBottomTab from '../../containers/DashboardBottomTab';
import ButtonNonRadius from '../../components/atoms/ButtonNonRadius';
import DashboardFirstTab from '../../containers/DashboardFirstTab';
import DashboardCards from '../../containers/DashboardCards';
import Card from '../../components/animated/Card';

import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../AppContext';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const {t} = useTranslation()
  const {data, updateData} = useAppContext()
  
  const [coSignature, setCoSignature] = useState(true);
  const [menuActive, setMenuActive] = useState(false);
  const [CardCommand, setCardCommand] = useState(false);

  const navigation = useNavigation()

  const handleActiveMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}>
        
      <View className={'flex-1 bg-black p-4'}>
        {menuActive ? (
          <SideMenu isOpen={menuActive} onClose={handleActiveMenu} />
        ) : null}

        <DashboardHeader onPress={handleActiveMenu} firstName={data?.signUpInfos?.firstName}/>

         {coSignature ? (
          <TouchableOpacity
            onPress={() => setCoSignature(false)}
            className={
              'flex-row justify-around items-center rounded-full p-1 bg-[#393E41] my-4'
            }>
            <AlertSvg />
            <Text className={'text-white'}>
            {t('Vous avez une demande de co-signature')}
            </Text>
            <ArrowRightSvg />
          </TouchableOpacity>
        ) : null}

        <View className={'flex-1 items-center justify-center '}>
          <Text className={'text-white font-bold text-lg'}>
            {t('Votre solde est de')}
          </Text>
          <Text className={'text-white font-bold text-4xl'}>00,00 Dh</Text>
        </View>

          {!CardCommand ? (
            <View className={'items-center'}>
              <Card data={data?.signUpInfos}/>
              <TouchableOpacity
                onPress={() => setCardCommand(true)}
                className={
                  'flex-row justify-around items-center rounded-full p-2 bg-[#393E41] w-[50%] mt-[-20px] z-20'
                }>
                <Text className={'text-white'}>{t('Commander ma carte')}</Text>
                <LocalizerSvg />
              </TouchableOpacity>
            </View>
          ) : (
            <DashboardCards />
          )}

        <DashboardFirstTab />

        <ButtonNonRadius buttonText={t('Emprunter maintenant')} onPress={() => navigation.navigate('Refund')}/>

        <DashboardBottomTab home={true} wallet={false}/>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
