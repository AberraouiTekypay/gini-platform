import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LoanFormHeader from '../../containers/LoanFormHeader';
import DropDownComponent from '../../components/atoms/DropDownComponent';
import TextInputComponent from '../../components/atoms/TextInputComponent';
import CheckBox from '@react-native-community/checkbox';
import ButtonRadius from '../../components/atoms/ButtonRadius';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


const FirstTimeLoanEligibility = () => {
   const {t} = useTranslation()
   const navigation = useNavigation()
  const handleChangeText = () => {}

  const EligibilitySchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{firstName: '', lastName: ''}}
      validationSchema={EligibilitySchema}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          navigation.navigate('FirstTimeLoanPermissions');
          setSubmitting(false);
        }, 500);
      }}
    >
      {({handleChange, handleSubmit, values, errors, touched, isSubmitting}) => (
        <ScrollView>
      <View className={'flex-1 px-4 pt-6'}>
        <LoanFormHeader progress={100} />
        <View className={'flex-1 mb-8'}>
          <View className={'mt-8'}>
            <Text className={'text-black font-bold text-2xl'}>
            {t('Vérification de l’éligibilité')}
            </Text>
            <Text className={'text-[#ccc] mt-1'}>
            {t('Vérifions votre éligibilité au prêt que vous avez\ndemandé')}
            </Text>
          </View>

          <View>
            <TextInputComponent Title={t('Nom')} onChangeText={handleChange('firstName')} />
            {touched.firstName && errors.firstName && (
              <Text style={{color: 'red'}}>{errors.firstName}</Text>
            )}
            <TextInputComponent Title={t('Prénom')} onChangeText={handleChange('lastName')} />
            {touched.lastName && errors.lastName && (
              <Text style={{color: 'red'}}>{errors.lastName}</Text>
            )}
            <TextInputComponent Title={t('Date de naissance')} onChangeText={handleChangeText} />
            <DropDownComponent title={t('Sexe')}/>
            <DropDownComponent title={t('Pays')}/>
            <DropDownComponent title={t('Ville de résidence')}/>
            <DropDownComponent title={t('Éducation')}/>
            <DropDownComponent  title={t('Employeur')}/>
            <TextInputComponent Title={t('Loyer mensuel')} onChangeText={handleChangeText} />
            <TextInputComponent Title={t('Revenus mensuels')} onChangeText={handleChangeText} />
            <View className={'mt-2'}>
                <Text className={'text-black font-bold'}>{t('Avez vous une voiture?')}</Text>
               <View className={'flex-row items-center gap-2 ml-4'}>
                <Text className={'text-black'}>{t('Oui')}</Text>
               <CheckBox />
               <Text className={'text-black'}>{t('Non')}</Text>
                <CheckBox />
               </View>
            </View>
            <DropDownComponent title={t('Situation familiale')}/>
            <TextInputComponent Title={t('Nombre d’enfants')} onChangeText={handleChangeText} />
          </View>
        </View>
        <View className={'items-center'}>
        <ButtonRadius onPress={handleSubmit} buttonText={t('Vérifier mon éligibilité')} background={true} />
        {isSubmitting && <ActivityIndicator className={'mt-2'} />}
        </View>
      </View>
    </ScrollView>
      )}
    </Formik>
  );
};

export default FirstTimeLoanEligibility;
