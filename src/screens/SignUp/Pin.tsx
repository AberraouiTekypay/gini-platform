import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';

import CloseSvg from '../../../assets/CloseSvg.svg';
import LockSvg from '../../../assets/LockSvg.svg';
import DeleteSvg from '../../../assets/DeleteSvg.svg';
import { useAppContext } from '../../AppContext';
import { useTranslation } from 'react-i18next';

const Pin: React.FC = () => {
  const {t} = useTranslation()
  const [pinValue, setPinValue] = useState<string[]>([]);
  const [errors, setErrors] = useState<{pin?: string}>({});
  const {data, updateData} = useAppContext()

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleWritePin = (num: string) => {
    if (pinValue.length >= 4) {
      const newPinValue = [...pinValue];
      newPinValue[3] = num;
      setPinValue(newPinValue);
    } else {
      setPinValue([...pinValue, num]);
    }
  };

  const handleDeletePin = () => {
    setPinValue([...pinValue.slice(0, -1)]);
    setErrors({});
  };

  const handleConfirmPin = () => {
    if (pinValue.length === 4) {
      const joinedPin = pinValue.join('');
      updateData({...data, signUpInfos: {...data.signUpInfos, pin: joinedPin}});
      navigation.navigate('UserName');
    } else {
      setErrors({pin: 'Please enter a complete 4-digit PIN'});
    }
  };

  return (
    <View className={'flex-1 px-4 pt-6'}>
      <Header normal={false} />
      <View className={'flex px-4'}>
        <TouchableOpacity
          className={'self-end pt-4'}
          onPress={() => navigation.navigate('SignIn')}>
          <CloseSvg />
        </TouchableOpacity>
        <View className={'mt-6'}>
          <Text className={'text-black font-bold text-2xl'}>
            {t('Choisissez un Pin')}
          </Text>
          <View className={'flex-row items-center'}>
            <Text className={'text-[#626262] text-sm'}>
              {t('Insérez un code à 4 chiffres')}
            </Text>
            <LockSvg />
          </View>
        </View>
      </View>
      <View className={'flex-row justify-center gap-6 py-10'}>
        <TextInput
          className={
            'text-center border-2 border-stone-300 w-10 h-13 rounded  text-lg font-bold text-black'
          }
          editable={false}
          value={pinValue[0] ?? ''}
        />
        <TextInput
          className={
            'text-center border-2 border-stone-300 w-10 h-13 rounded  text-lg font-bold text-black'
          }
          editable={false}
          value={pinValue[1] ?? ''}
        />
        <TextInput
          className={
            'text-center border-2 border-stone-300 w-10 h-13 rounded text-lg font-bold text-black'
          }
          editable={false}
          value={pinValue[2] ?? ''}
        />
        <TextInput
          className={
            'text-center border-2 border-stone-300 w-10 h-13 rounded text-lg font-bold text-black'
          }
          editable={false}
          value={pinValue[3] ?? ''}
        />
      </View>
      <View className=" flex-row flex-wrap ">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number, i) => (
          <TouchableOpacity
            onPress={() => handleWritePin(number)}
            key={i}
            className={' w-1/3 py-6'}>
            <Text className={'font-bold text-black text-xl text-center'}>
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className={'flex-row justify-end'}>
        <TouchableOpacity
          onPress={() => handleWritePin('0')}
          className={' w-1/3 py-6'}>
          <Text className={'font-bold text-black text-xl text-center'}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeletePin()}
          className={'flex w-1/3 py-6 justify-center items-center'}>
          <DeleteSvg />
        </TouchableOpacity>
      </View>
      {errors.pin && <Text style={{color: 'red'}}>{errors.pin}</Text>}
      <TouchableOpacity
        onPress={handleConfirmPin}
        className={
          ' absolute bottom-2 flex items-center justify-center self-center bg-[#936EE3] rounded-full w-[350px] h-[56px]'
        }>
        <Text className={'text-white text-sm'}>{t('Confirmer')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pin;
