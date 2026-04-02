import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

import CloseWhiteSvg from '../../assets/CloseWhiteSvg.svg';
import LogoSvg from '../../assets/LogoSvg.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../src/navigation/types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({isOpen, onClose}) => {
  const {t} = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [menuAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isOpen) {
      // Open the menu
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Close the menu
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Call the onClose callback after the animation completes
        if (!isOpen && typeof onClose === 'function') {
          onClose();
        }
      });
    }
  }, [isOpen, onClose, menuAnimation]);

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0], // Adjust the initial value (-300) as per your menu width
  });

  return (
    <Animated.View
      className={
        'absolute left-0 top-0 h-[100%] w-[90%] bg-[#393E41] px-5 pt-6 pb-2 z-30'
      }
      style={{transform: [{translateX: menuTranslateX}]}}>
      <View className={' flex-row justify-between'}>
        <LogoSvg />
        <TouchableOpacity className={'self-end'} onPress={onClose}>
          <CloseWhiteSvg />
        </TouchableOpacity>
      </View>
      <View className={'flex-1 mt-20'}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} className={'self-start py-2'}>
            <Text className={'text-white font-light text-base'} >{t('Accueil')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} className={'self-start  py-2'}>
            <Text className={'text-white font-light text-base'}>{t('Mon score')}</Text>
        </TouchableOpacity>
        <TouchableOpacity className={'self-start  py-2'}>
            <Text onPress={() => navigation.navigate('FirstTimeLoanForm')} className={'text-white font-light text-base'}>{t('Emprunter de l’argent')}</Text>
        </TouchableOpacity>
        <TouchableOpacity className={'self-start  py-2'}>
            <Text className={'text-white font-light text-base'}>{t('Repayer un prêt')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sponsorship')} className={'self-start  py-2'}>
            <Text className={'text-white font-light text-base'}>{t('Inviter des proches')}</Text>
        </TouchableOpacity>
        <TouchableOpacity className={'self-start  py-2'}>
            <Text className={'text-white font-light text-base'}>{t('Envoyer de l’argent')}</Text>
        </TouchableOpacity>
        <TouchableOpacity className={'self-start  py-2'}>
            <Text className={'text-white font-light text-base'}>{t('Paramètres')}</Text>
        </TouchableOpacity>
        <TouchableOpacity className={'self-start  py-2'}>
            <Text className={'text-white font-light text-base'}>{t('Assistance')}</Text>
        </TouchableOpacity>
        <TouchableOpacity className={'self-start  py-2'}>
            <Text className={'text-white font-light text-base'}>{t('Conditions générale d’utilisation')}</Text>
        </TouchableOpacity>
      </View>
      <Text className={'self-center text-white font-light text-base'}>v2.1.2</Text>
    </Animated.View>
  );
};

export default SideMenu;
