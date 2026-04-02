import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';

import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';

import CloseSvg from '../../../assets/CloseSvg.svg';
import {useAppContext} from '../../AppContext';

const UserName: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {data, updateData} = useAppContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState<{firstName?: string, lastName?: string}>({});

  const handleFinish = () => {
    const newErrors: {firstName?: string, lastName?: string} = {};

    if (!firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedData = {
      ...data,
      signUpInfos: {...data.signUpInfos, firstName, lastName},
    };
    updateData(updatedData);
    navigation.navigate('Welcoming');
  };

  return (
    <View className={'flex-1 px-4 pt-6'}>
      <Header normal={false} />
      <View className={'flex'}>
        <TouchableOpacity
          className={'self-end pt-4'}
          onPress={() => navigation.navigate('SignIn')}>
          <CloseSvg />
        </TouchableOpacity>
        <View className={'mt-6'}>
          <Text className={'text-black font-bold text-2xl'}>
            {t("Apprenons à nous connaître")}
          </Text>
          <Text className={'text-[#626262] text-sm'}>
            {t('Quel est votre nom complet ?')}
          </Text>
        </View>
        <View className={'mt-4'}>
          <Text className={'text-black text-base font-bold mb-2'}>
            {t('Votre prénom')}
          </Text>
          <View
            className={'flex-row items-center bg-[#dbdbdb] h-[64px] w-full' }>
            <TextInput
              className={'px-4 text-black'}
              value={firstName}
              onChangeText={setFirstName}
            />
            {errors.firstName && (
              <Text style={{color: 'red'}}>{errors.firstName}</Text>
            )}
          </View>
          <Text className={'text-black text-base font-bold my-2'}>
            {t('Votre nom')}
          </Text>
          <TextInput
            className={'bg-[#dbdbdb] h-[64px] w-full px-4 text-black'}
            value={lastName}
            onChangeText={setLastName}
          />
          {errors.lastName && (
            <Text style={{color: 'red'}}>{errors.lastName}</Text>
          )}
        </View>
      </View>
      <View
        className={
          'absolute flex items-center gap-1 bottom-2 left-[50%] right-[50%]'
        }>
        <TouchableOpacity
          onPress={handleFinish}
          className={
            ' flex items-center justify-center bg-[#936EE3] rounded-full w-[350px] h-[56px]'
          }>
          <Text className={'text-white text-sm'}>{t('Terminer')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserName;
