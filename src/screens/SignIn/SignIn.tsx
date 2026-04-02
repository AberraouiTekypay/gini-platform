import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ActivityIndicator} from 'react-native';
import Header from '../../components/Header';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';

import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';

import TextInputComponent from '../../components/atoms/TextInputComponent';

import CloseSvg from '../../../assets/CloseSvg.svg';
import MoneyFlySvg from '../../../assets/MoneyFlySvg.svg';
import PolygonSvg from '../../../assets/PolygonSvg.svg';
import FaceIdSvg from '../../../assets/FaceIdSvg.svg';
import ConfettiSvg from '../../../assets/ConfettiSvg.svg';
import ButtonRadius from '../../components/atoms/ButtonRadius';

import {useAppContext} from '../../AppContext';

// TODO: Move this to a proper auth service
const login = async (values: any) => {
  return Promise.resolve();
};

const SignIn: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {data, updateData} = useAppContext();

  const SignInSchema = Yup.object().shape({
    countryCode: Yup.string().required('Country code is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    securityPin: Yup.string().required('Security pin is required'),
  });

  return (
    <Formik
      initialValues={{countryCode: 'MA', phoneNumber: '', securityPin: ''}}
      validationSchema={SignInSchema}
      onSubmit={async (values, {setSubmitting, setErrors}) => {
        try {
          await login(values);
          const newData = { ...data, authInfos: values };
          updateData(newData);
          navigation.navigate('Dashboard');
        } catch (err: any) {
          const message = err.response?.data?.message || err.message;
          setErrors({phoneNumber: message});
        }
        setSubmitting(false);
      }}
    >
      {({handleChange, handleSubmit, setFieldValue, values, errors, touched, isSubmitting}) => (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View className={'flex-1 justify-between px-4 pt-6 '}>
            <Header normal={false} />

            <View className={'flex-1  pt-4'}>
              <TouchableOpacity
                className={'self-end'}
                onPress={() => navigation.navigate('WalkThrough')}>
                <CloseSvg />
              </TouchableOpacity>
              <View className={'mt-4'}>
                <Text className={'text-black font-bold text-2xl'}>
                  {t('Authentification')}
                </Text>
                <View className={'flex-row items-center'}>
                  <Text className={'text-[#626262] text-sm font-light'}>
                    {t(`Un pas de plus vers l'indépendance financière`)}
                  </Text>
                  <MoneyFlySvg />
                </View>
              </View>

              <View className={'mt-4'}>
                <Text className={'text-black text-sm font-semibold mb-1'}>
                  {t('Insérez le code OTP')}
                </Text>
                <View className={'flex-row items-center bg-[#dbdbdb] h-[64px] w-full'}>
                  <View className={'flex-row items-center px-4'}>
                    <CountryPicker
                      withFilter
                      withFlag
                      onSelect={country => setFieldValue('countryCode', country.cca2)}
                      countryCode={values.countryCode as CountryCode}
                    />
                    <PolygonSvg />
                  </View>
                  <View className={'h-[80%] w-[1px] bg-[#afafaf]'} />
                  <TextInput
                    onChangeText={handleChange('phoneNumber')}
                    value={values.phoneNumber}
                    keyboardType="number-pad"
                    placeholder="0606783544"
                    placeholderTextColor={'#afafaf'}
                    className={'px-4 text-black'}
                  />
                </View>
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={{color: 'red'}}>{errors.phoneNumber}</Text>
                )}
                <TextInputComponent
                  Title={t('Votre pin de sécurité')}
                  onChangeText={handleChange('securityPin')}
                  textSecure={true}
                />
                {touched.securityPin && errors.securityPin && (
                  <Text style={{color: 'red'}}>{errors.securityPin}</Text>
                )}

                <View className={'flex-row justify-end'}>
                  <Text className={'font-medium text-sm text-[#626262]'}>
                    {t('Pin de sécurité oublié ?')}
                  </Text>
                  <TouchableOpacity>
                    <Text className={'font-medium text-sm text-[#1E1E1EB2] underline'}>
                      {t('par ici')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity className={'items-center mt-10'}>
                <FaceIdSvg />
              </TouchableOpacity>
            </View>

            <View className={' items-center justify-center'}>
              <ButtonRadius
                onPress={() => navigation.navigate('SignUp')}
                buttonText={t('Créer un compte Gini')}
                background={false}
                svgComponent={ConfettiSvg}
              />
              <ButtonRadius
                onPress={handleSubmit}
                buttonText={t('Authenticate')}
                background={true}
              />
              {isSubmitting && <ActivityIndicator className={'mt-2'} />}
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default SignIn;
