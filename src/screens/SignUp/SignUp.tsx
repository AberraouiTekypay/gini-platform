import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";

import CloseSvg from "../../../assets/CloseSvg.svg";
import MoneyFlySvg from "../../../assets/MoneyFlySvg.svg";
import PolygonSvg from "../../../assets/PolygonSvg.svg";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

import ButtonRadius from "../../components/atoms/ButtonRadius";
import { useAppContext } from "../../AppContext";

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, updateData } = useAppContext();

  const SignUpSchema = Yup.object().shape({
    countryCode: Yup.string().required("Country code is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  return (
    <Formik
      initialValues={{ countryCode: 'MA', phoneNumber: '' }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        // Mocking the behavior for now as in the original file
        setTimeout(() => {
          navigation.navigate('SignUpOtp');
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ handleChange, handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
        <View className={'flex-1 px-4 pt-6'}>
          <Header normal={false} />

          <View className={'flex-1'}>
            <TouchableOpacity
              className={'pt-4 self-end'}
              onPress={() => navigation.navigate('SignIn')}>
              <CloseSvg />
            </TouchableOpacity>

            <View className={'mt-6'}>
              <Text className={'text-black font-bold text-2xl'}>
                {t('Création de compte')}
              </Text>
              <View className={'flex-row items-center'}>
                <Text className={'text-[#626262] text-sm'}>
                  {t("Un pas de plus vers l'indépendance financière")}
                </Text>
                <MoneyFlySvg />
              </View>
            </View>
            <View className={'mt-4'}>
              <Text className={'text-black text-base font-bold mb-2'}>
                {t('Insérez votre numéro de téléphone')}
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
                <Text style={{ color: 'red' }}>{errors.phoneNumber}</Text>
              )}
            </View>
          </View>

          <View className={'items-center'}>
            <ButtonRadius
              buttonText={t('Suivant')}
              onPress={handleSubmit}
              background={true}
            />
            {isSubmitting && <ActivityIndicator className={'mt-2'} />}
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
