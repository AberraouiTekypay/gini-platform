import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import CreditCardSvg from '../../assets/CreditCardSvg.svg';
import SendMoneySvg from '../../assets/SendMoneySvg.svg';
import InvoiceFileSvg from '../../assets/InvoiceFileSvg.svg';
import CoinBlackSvg from '../../assets/CoinBlackSvg.svg';
import { useTranslation } from 'react-i18next';

const WalletMiddleButtons = () => {
  const {t} = useTranslation()
  return (
    <View className={'flex-row justify-between mt-4'}>
      <View className={'items-center'}>
        <TouchableOpacity
          className={
            'bg-[#393E41] rounded-full h-14 w-14 items-center justify-center'
          }>
          <CreditCardSvg />
        </TouchableOpacity>
        <Text className={'text-[#ccc] text-base text-center'}>
         {t('Moyens de\npaiement')}
        </Text>
      </View>
      <View className={'items-center'}>
        <TouchableOpacity
          className={
            'bg-[#D9D9D9] rounded-full h-14 w-14 items-center justify-center'
          }>
          <CoinBlackSvg />
        </TouchableOpacity>
        <Text className={'text-[#ccc] text-base text-center'}>{t('Emprunter')}</Text>
      </View>
      <View className={'items-center'}>
        <TouchableOpacity
          className={
            'bg-[#D9D9D9] rounded-full h-14 w-14 items-center justify-center'
          }>
          <InvoiceFileSvg />
        </TouchableOpacity>
        <Text className={'text-[#ccc] text-base text-center'}>{t('Payer une\nfacture')}</Text>
      </View>
      <View className={'items-center'}>
        <TouchableOpacity
          className={
            'bg-[#393E41] rounded-full h-14 w-14 items-center justify-center'
          }>
          <SendMoneySvg />
        </TouchableOpacity>
        <Text className={'text-[#ccc] text-base text-center'}>{t('Envoyer de\nl’argent')}</Text>
      </View>
    </View>
  );
};

export default WalletMiddleButtons;
