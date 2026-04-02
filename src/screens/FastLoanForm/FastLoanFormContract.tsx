import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import LoanFormHeader from '../../containers/LoanFormHeader';
import {useTranslation} from 'react-i18next';
import ButtonRadius from '../../components/atoms/ButtonRadius';
import { useNavigation } from '@react-navigation/native';

const FastLoanFormContract = () => {
    const navigation = useNavigation()
  const {t} = useTranslation();
  return (
    <View className={'flex-1 px-4 pt-6'}>
      <ScrollView className={'flex-1'}>
        <LoanFormHeader progress={200} />
        <View className={'mt-6'}>
          <Text className={'text-black font-bold text-2xl'}>
            {t('Signature de contrat')}
          </Text>
          <Text className={'mt-1 text-[#ccc]'}>
            {t('Veuillez signer le contrat ci-dessous')}
          </Text>
        </View>
        <Text className={'text-black mt-4'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing{'\n'} elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus
          luctus accumsan tortor posuere ac ut consequat semper. Elementum nibh
          tellus molestie nunc non. Ut tristique et egestas quis ipsum. Rhoncus
          aenean vel elit scelerisque. Rhoncus dolor purus non enim praesent.
          Ullamcorper sit amet risus nullam eget felis. Libero id faucibus nisl
          tincidunt eget nullam non. Pharetra diam sit amet nisl suscipit
          adipiscing bibendum. Vestibulum sed arcu non odio euismod lacinia at.
          Aliquam malesuada bibendum arcu vitae elementum curabitur. Felis
          imperdiet proin fermentum leo vel. Non sodales neque sodales ut.
          Tellus integer feugiat scelerisque varius. Nulla pharetra diam sit
          amet nisl suscipit adipiscing bibendum. Neque convallis a cras semper
          auctor neque vitae tempus quam. Purus semper eget duis at tellus at.
          Et pharetra pharetra massa massa ultricies mi quis hendrerit. Rhoncus
          aenean vel elit scelerisque. Elementum curabitur vitae nunc sed velit
          dignissim sodales. Dictumst quisque sagittis purus sit amet volutpat
          consequat mauris. Accumsan tortor posuere ac ut. Duis at tellus at
          urna condimentum mattis pellentesque id. Sed id semper risus in.
          Convallis tellus id interdum velit laoreet id donec ultrices. Sit amet
          purus gravida quis blandit turpis cursus. Sodales neque sodales ut
          etiam sit. Scelerisque fermentum dui faucibus in ornare. Tellus in hac
          habitasse platea dictumst vestibulum rhoncus est pellentesque.
          Bibendum at varius vel pharetra vel. Proin fermentum leo vel orci.
          Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut.
          Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Ac
          felis donec et odio. Blandit libero volutpat sed cras ornare arcu dui.
          Venenatis urna cursus eget nunc scelerisque viverra. Condimentum id
          venenatis a condimentum. Duis tristique sollicitudin nibh sit amet
          commodo nulla facilisi nullam. Condimentum lacinia quis vel eros
          donec. Vitae congue mauris rhoncus aenean vel elit. Tellus cras
          adipiscing enim eu turpis egestas pretium aenean pharetra. Posuere
          lorem ipsum dolor sit amet. Sed nisi lacus sed viverra tellus in.
          Lorem mollis aliquam ut porttitor leo a diam. Nam libero justo laoreet
        </Text>
      </ScrollView>
      <View className={'items-center'}>
        <ButtonRadius onPress={() => navigation.navigate('FastLoanFormSignature')} buttonText={t('Je souhaite signer le contrat')} background={true} />
      </View>
    </View>
  );
};

export default FastLoanFormContract;
