import {View, Text} from 'react-native';
import React from 'react';

import LogoBlackSvg from '../../../assets/LogoBlackSvg.svg';
import CloseSvg from '../../../assets/CloseSvg.svg';
import CongratSvg from '../../../assets/CongratSvg.svg';
import ButtonRadius from '../../components/atoms/ButtonRadius';
import {useNavigation, RouteProp} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type FirstTimeLoanCongratulationsRouteProp = RouteProp<RootStackParamList, 'FirstTimeLoanCongratulations'>;

interface FirstTimeLoanCongratulationsProps {
  route: FirstTimeLoanCongratulationsRouteProp;
}

const FirstTimeLoanCongratulations: React.FC<FirstTimeLoanCongratulationsProps> = ({route}) => {
  const {t} = useTranslation()
  const { firstText, secondText, nextScreen, buttonText } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className={'flex-1 px-4 pt-6'}>
      <View className={'flex-row justify-between items-center'}>
        <LogoBlackSvg />
        <CloseSvg />
      </View>

      <View className={' mt-12'}>
        <Text className={'text-black font-bold text-2xl'}>{t(firstText)}</Text>
        <Text className={'mt-1 text-[#ccc]'}>
          {t(secondText)}
        </Text>
      </View>
      <View className={'flex-1 items-center justify-center'}>
        <CongratSvg />
      </View>
      <View className={'items-center'}>
        <ButtonRadius
          onPress={() => navigation.navigate(nextScreen as any)} // TODO: Fix navigation typing
          buttonText={t(buttonText)}
          background={true}
        />
      </View>
    </View>
  );
};

export default FirstTimeLoanCongratulations;
