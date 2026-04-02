import env from '../../config/env';
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

import QrSvg from '../../../assets/QrSvg.svg';

const Dashboard = () => {
  const {t} = useTranslation()
  const {data, updateData} = useAppContext()
  
  const [coSignature, setCoSignature] = useState(true);
  const [menuActive, setMenuActive] = useState(false);
  const [CardCommand, setCardCommand] = useState(false);
  const [agentMode, setAgentMode] = useState(false);

  const navigation = useNavigation()

  const handleActiveMenu = () => {
    setMenuActive(!menuActive);
  };

  const isAgent = data?.signUpInfos?.role === 'ROLE_AGENT' || data?.user?.role === 'ROLE_AGENT';

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}>
        
      <View className={'flex-1 bg-black p-4'}>
        {menuActive ? (
          <SideMenu isOpen={menuActive} onClose={handleActiveMenu} />
        ) : null}

        <DashboardHeader onPress={handleActiveMenu} firstName={data?.signUpInfos?.firstName}/>

        {isAgent && (
          <TouchableOpacity 
            onPress={() => setAgentMode(!agentMode)}
            className={'bg-[#936EE3] py-2 px-4 rounded-lg my-2 self-end'}
          >
            <Text className={'text-white font-bold text-xs'}>
              {agentMode ? t('Mode Client') : t('Mode Agent')}
            </Text>
          </TouchableOpacity>
        )}

         {coSignature && !agentMode ? (
...
        <View className={'flex-1 items-center justify-center '}>
          <Text className={'text-white font-bold text-lg'}>
            {agentMode ? t('Votre float agent est de') : t('Votre solde est de')}
          </Text>
          <Text className={'text-white font-bold text-4xl'}>
            {agentMode ? (data?.user?.floatBalance || '0,00') : '00,00'} {env.CURRENCY_CODE}
          </Text>
        </View>

        {agentMode && (
          <View className={'items-center my-6'}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('QrPayment')}
              className={'bg-white p-4 rounded-2xl items-center flex-row shadow-lg'}
            >
              <QrSvg width={24} height={24} fill="#000" />
              <Text className={'text-black font-bold ml-2'}>{t('Afficher mon QR Marchand')}</Text>
            </TouchableOpacity>
          </View>
        )}

          {!CardCommand && !agentMode ? (
...
          ) : !agentMode ? (
            <DashboardCards />
          ) : null}

        {!agentMode && <DashboardFirstTab />}

        {!agentMode && <ButtonNonRadius buttonText={t('Emprunter maintenant')} onPress={() => navigation.navigate('Refund')}/>}

        <DashboardBottomTab home={true} wallet={false}/>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
