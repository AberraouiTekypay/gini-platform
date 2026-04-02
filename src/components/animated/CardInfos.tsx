import {View, Text} from 'react-native';
import React from 'react';
import LogoSvg from '../../../assets/LogoSvg.svg';
import PolygonTwoSvg from '../../../assets/PolygonTwoSvg.svg';

import {BlurView} from '@react-native-community/blur';
import {useTranslation} from 'react-i18next';

const CardInfos = ({width = 347}) => {
  const {t} = useTranslation();
  return (
    <View
      style={{
        position: 'relative',
        width: width,
        height: 210,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
      <BlurView style={{width: width, height: 219}} blurAmount={10}>
        <View
          className={' bg-[#9C9C9B] p-3 rounded-xl h-[219px]'}
          style={{width: width, opacity: 0.5}}>
          <View className={'flex-row justify-end'}>
            <LogoSvg />
          </View>
          <View className={'my-1'}>
            <Text className={'text-white font-light text-sm'}>
              {t('Titulaire de la carte:')}
            </Text>
            <Text className={'text-white font-light text-lg'}>
              Mouna Bennani
            </Text>
          </View>
          <View className={'my-1'}>
            <Text className={'text-white font-light text-sm'}>
              {t('Numéros de la carte:')}
            </Text>
            <Text className={'text-white font-light text-lg'}>
              {t('1234     5678    9100    1112')}
            </Text>
          </View>
          <View className={'flex-row justify-between'}>
            <View>
              <Text className={'text-white font-light text-sm'}>
                {t('Expiration:')}
              </Text>
              <Text className={'text-white font-light text-lg'}>12/26</Text>
            </View>
            <View>
              <Text className={'text-white font-light text-sm'}>CVV:</Text>
              <View className={'flex-row items-center gap-1'}>
                <Text className={'text-white font-bold text-lg'}>
                  {t('Générer par SMS')}
                </Text>
                <PolygonTwoSvg />
              </View>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default CardInfos;
