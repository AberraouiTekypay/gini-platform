import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import LoanFormHeader from '../../containers/LoanFormHeader';

import MarkerBlackSvg from '../../../assets/MarkerBlackSvg.svg';
import CalendarSvg from '../../../assets/CalendarSvg.svg';
import SettingsSvg from '../../../assets/SettingsSvg.svg';
import PictureSvg from '../../../assets/PictureSvg.svg';
import AppsBlackSvg from '../../../assets/AppsBlackSvg.svg';
import SolarSvg from '../../../assets/SolarSvg.svg';
import SmsSvg from '../../../assets/SmsSvg.svg';
import FormSvg from '../../../assets/FormSvg.svg';
import ButtonRadius from '../../components/atoms/ButtonRadius';
import {useTranslation} from 'react-i18next';

const FirstTimeLoanPermissions = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View className={'flex-1 px-4 pt-6'}>
        <LoanFormHeader progress={130} />
        <View className={'flex-1 my-4'}>
          <View className={'mb-1'}>
            <Text className={'text-black font-bold text-2xl'}>
              {t('Autorisations')}
            </Text>
            <Text className={'mt-1 text-[#ccc]'}>
              {t(
                'Pour étudier votre éligibilité au crédit, nous avons\nbesoin de votre consentement pour collecter des\ndonnées',
              )}
              <Text className={'font-bold'}>{t('100% anonymes')}</Text>
              {t('à partir de votre téléphone\nportable.')}
            </Text>
          </View>

          <View className={'mt-5'}>
            <View className={'flex-row items-center gap-2 mb-1'}>
              <MarkerBlackSvg />
              <Text className={'text-black font-bold'}>
                {t('Géolocalisation')}
              </Text>
            </View>
            <Text className={'text-[#ccc]'}>
              {t(
                'Nous collectons les données de localisation pour mieux comprendre\nles habitudes de déplacement et de voyage de nos utilisateurs. Cela\nnous permet de mieux évaluer leur solvabilité.',
              )}
            </Text>
          </View>
          <View className={'mt-5'}>
            <View className={'flex-row items-center gap-2 mb-1'}>
              <CalendarSvg />
              <Text className={'text-black font-bold'}>{t('Calendrier')}</Text>
            </View>
            <Text className={'text-[#ccc]'}>
              {t(
                'Nous collectons les événements de votre calendrier pour mieux\ncomprendre vos habitudes et votre capacité à respecter les\néchéances.',
              )}
            </Text>
          </View>
          <View className={'mt-5'}>
            <View className={'flex-row items-center gap-2 mb-1'}>
              <SettingsSvg />
              <Text className={'text-black font-bold'}>{t('Paramètres')}</Text>
            </View>
            <Text className={'text-[#ccc]'}>
              {t(
                `Nous collectons des données sur les paramètres de votre téléphone,\ncomme la langue et la durée de l'écran, pour mieux comprendre\nvotre profil d'utilisateur.`,
              )}
            </Text>
          </View>
          <View className={'mt-5'}>
            <View className={'flex-row items-center gap-2 mb-1'}>
              <PictureSvg />
              <Text className={'text-black font-bold'}>{t('Multimédias')}</Text>
            </View>
            <Text className={'text-[#ccc]'}>
              {t(
                'Nous collectons des données anonymes sur les images et les vidéos\nde votre galerie pour mieux comprendre vos\nintérêts et vos préférences.',
              )}
            </Text>
          </View>
          <View className={'mt-5'}>
            <View className={'flex-row items-center gap-2 mb-1'}>
              <AppsBlackSvg />
              <Text className={'text-black font-bold'}>
                {t('Applications')}
              </Text>
            </View>
            <Text className={'text-[#ccc]'}>
              {t(
                `Nous collectons des informations sur les applications installées sur\nvotre appareil pour mieux comprendre votre utilisation quotidienne\nde votre smartphone. Cela nous permet d'améliorer notre évaluation\n`,
              )}
              de votre profil de crédit.
            </Text>
          </View>
          <View className={'mt-5'}>
            <View className={'flex-row items-center gap-2 mb-1'}>
              <SolarSvg />
              <Text className={'text-black font-bold'}>{t('Système')}</Text>
            </View>
            <Text className={'text-[#ccc]'}>
              {t(
                `Nous collectons des informations sur la version de votre système\nd'exploitation pour mieux comprendre les spécificités de votre\nappareil. Cela nous permet d'améliorer notre évaluation de votre\nprofil de crédit.`,
              )}
            </Text>
          </View>
          <View className={'mt-5'}>
            <View className={'flex-row items-center gap-2 mb-1'}>
              <SmsSvg />
              <Text className={'text-black font-bold'}>{t('SMS')}</Text>
            </View>
            <Text className={'text-[#ccc]'}>
              {t(
                `Nous collectons des informations sur vos messages pour mieux\ncomprendre vos interactions avec votre environnement. Cela nous\npermet d'améliorer notre évaluation de votre profil de crédit.`,
              )}
            </Text>
          </View>
          <View className={'mt-5'}>
            <View className={'flex-row items-center gap-2 mb-1'}>
              <FormSvg />
              <Text className={'text-black font-bold'}>{t('Contracts')}</Text>
            </View>
            <Text className={'text-[#ccc]'}>
              {t(
                `Nous collectons des informations sur vos contacts pour mieux\ncomprendre votre réseau et votre environnement social. Cela nous\npermet d'améliorer notre évaluation de votre profil de crédit.`,
              )}
            </Text>
          </View>
        </View>
        <View className={'items-center'}>
          <ButtonRadius
            onPress={() => navigation.navigate('FirstTimeLoanAnalyse')}
            buttonText={t('J’autorise la collecte des informations')}
            background={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default FirstTimeLoanPermissions;
