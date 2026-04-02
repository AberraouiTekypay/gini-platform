import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import DashboardHeader from '../../components/DashboardHeader'

import SideMenu from '../../containers/SideMenu';
import WalletCard from '../../components/animated/WalletCard';
import WalletMiddleButtons from '../../containers/WalletMiddleButtons';
import RightWhiteArrow from '../../../assets/RightWhiteArrow.svg'
import TransactionItem from '../../components/atoms/TransactionItem';
import DashboardBottomTab from '../../containers/DashboardBottomTab';
import { useAppContext } from '../../AppContext';
import { useTranslation } from 'react-i18next';






const Wallet = () => {
  const {t} = useTranslation()
    const [menuActive, setMenuActive] = useState(false);
    const {data, updateData} = useAppContext()

    const handleActiveMenu = () => {
        setMenuActive(!menuActive);
      };
  return (
    <View className={'flex-1 bg-black p-4'}>
        {menuActive ? (
          <SideMenu isOpen={menuActive} onClose={handleActiveMenu} />
        ) : null}
      <DashboardHeader onPress={handleActiveMenu} firstName={data?.signUpInfos?.firstName}/>
      <WalletCard />
      <WalletMiddleButtons />
      <View className={'flex-1 mt-6'}>
      <View className={'flex-row justify-between  items-center'}>
        <Text className={'text-white font-medium'}>{t('Transactions')}</Text>
        <TouchableOpacity className={'flex-row items-center gap-2'}>
            <Text className={'text-white'}>{t('Tout voir')}</Text>
            <RightWhiteArrow />
        </TouchableOpacity>
      </View>
      <View className={'mt-3'}>
            <TransactionItem />
            <View className={'w-full h-[1px] bg-[#9B9B9A] my-2'}/>
            <TransactionItem />
            <View className={'w-full h-[1px] bg-[#9B9B9A] my-2'}/>
            <TransactionItem />
        </View>
      </View>
      <DashboardBottomTab home={false} wallet={true}/>
    </View>
  )
}

export default Wallet
