import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import LoanFormHeader from '../../containers/LoanFormHeader';
import ButtonRadius from '../../components/atoms/ButtonRadius';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CheckWhite from '../../assets/CheckWhite.svg';

const FirstTimeLoanContract = () => {
  const {t} = useTranslation()
    const navigation = useNavigation()
    const [authorized, setAuthorized] = useState(false)
  return (
    <View className={'flex-1 px-4 pt-6'}>
      <ScrollView className={'flex-1'}>
        <LoanFormHeader progress={300} />
        <View className={'mt-6'}>
          <Text className={'text-black font-bold text-2xl'}>
          {t('Signature de contrat')}
          </Text>
          <Text className={'mt-1 text-[#ccc]'}>{t('Veuillez signer le contrat ci-dessous')}</Text>
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
          sit. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae
          nunc. Ac odio tempor orci dapibus ultrices in iaculis nunc. Pulvinar
          mattis nunc sed blandit. Quam vulputate dignissim suspendisse in est
          ante in nibh mauris. Ut placerat orci nulla pellentesque dignissim
          enim. In ante metus dictum at tempor commodo ullamcorper a. Id donec
          ultrices tincidunt arcu. Malesuada bibendum arcu vitae elementum
          curabitur vitae. Lectus mauris ultrices eros in cursus turpis. Donec
          enim diam vulputate ut pharetra sit amet aliquam. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames. Dolor
          sed viverra ipsum nunc. At lectus urna duis convallis. Dis parturient
          montes nascetur ridiculus mus mauris vitae. Pharetra sit amet aliquam
          id. Placerat vestibulum lectus mauris ultrices eros in. Sit amet
          mattis vulputate enim nulla aliquet porttitor lacus luctus. Etiam erat
          velit scelerisque in dictum non consectetur. Habitasse platea dictumst
          quisque sagittis purus sit amet volutpat consequat. Urna et pharetra
          pharetra massa massa ultricies. Volutpat commodo sed egestas egestas
          fringilla phasellus faucibus. Morbi leo urna molestie at. Porta non
          pulvinar neque laoreet. Amet consectetur adipiscing elit ut aliquam.
          Id venenatis a condimentum vitae. Placerat in egestas erat imperdiet
          sed euismod nisi porta lorem. Odio facilisis mauris sit amet massa.
          Laoreet non curabitur gravida arcu ac tortor dignissim. In eu mi
          bibendum neque egestas congue quisque egestas diam. Velit ut tortor
          pretium viverra suspendisse potenti nullam. Dui accumsan sit amet
          nulla facilisi morbi. Iaculis urna id volutpat lacus laoreet non. Sed
          lectus vestibulum mattis ullamcorper velit sed. Nisi est sit amet
          facilisis. Consectetur lorem donec massa sapien faucibus. Enim ut
          tellus elementum sagittis vitae et leo duis. Laoreet non curabitur
          gravida arcu ac. Ipsum dolor sit amet consectetur adipiscing elit.
          Justo eget magna fermentum iaculis. Nibh sit amet commodo nulla
          facilisi nullam vehicula ipsum. Maecenas accumsan lacus vel facilisis
          volutpat est velit. Neque vitae tempus quam pellentesque nec nam
          aliquam. Enim tortor at auctor urna nunc id cursus. Quisque sagittis
          purus sit amet volutpat consequat mauris. Aliquam eleifend mi in nulla
          posuere sollicitudin. Quis varius quam quisque id diam vel quam.
          Sociis natoque penatibus et magnis dis parturient montes nascetur.
          Pretium vulputate sapien nec sagittis aliquam malesuada. Ornare aenean
          euismod elementum nisi. Magna ac placerat vestibulum lectus mauris
          ultrices eros. Semper quis lectus nulla at volutpat diam ut venenatis.
          In hac habitasse platea dictumst quisque sagittis. Ullamcorper eget
          nulla facilisi etiam dignissim diam quis enim lobortis. Eleifend mi in
          nulla posuere sollicitudin aliquam ultrices sagittis. Arcu cursus
          euismod quis viverra nibh cras pulvinar. Ligula ullamcorper malesuada
          proin libero nunc consequat interdum varius. Nunc non blandit massa
          enim. Viverra accumsan in nisl nisi scelerisque eu. Dui nunc mattis
          enim ut tellus elementum sagittis. In ornare quam viverra orci
          sagittis. Nisi est sit amet facilisis magna etiam tempor orci. Nec nam
          aliquam sem et tortor consequat. Amet porttitor eget dolor morbi non
          arcu. Mi bibendum neque egestas congue quisque egestas diam in arcu.
          Auctor urna nunc id cursus. Volutpat maecenas volutpat blandit aliquam
          etiam erat. Sed tempus urna et pharetra pharetra massa massa. Faucibus
          vitae aliquet nec ullamcorper. Nulla pellentesque dignissim enim sit
          amet venenatis urna. Eu consequat ac felis donec et odio pellentesque
          diam volutpat. At augue eget arcu dictum varius. Faucibus turpis in eu
          mi. Viverra aliquet eget sit amet. Amet nisl suscipit adipiscing
          bibendum est ultricies integer. Vulputate sapien nec sagittis aliquam
          malesuada. Sed arcu non odio euismod lacinia at. Lectus sit amet est
          placerat in egestas. Purus viverra accumsan in nisl. Odio ut sem nulla
          pharetra diam sit. Eget est lorem ipsum dolor sit amet. Imperdiet sed
          euismod nisi porta lorem. Odio pellentesque diam volutpat commodo sed
          egestas egestas fringilla. Purus semper eget duis at tellus at urna
          condimentum mattis. Eget mauris pharetra et ultrices neque ornare
          aenean euismod elementum. Lectus quam id leo in vitae turpis massa.
          Libero nunc consequat interdum varius sit amet mattis. Aenean euismod
          elementum nisi quis. Commodo odio aenean sed adipiscing diam donec
          adipiscing. Nascetur ridiculus mus mauris vitae ultricies. Feugiat in
          fermentum posuere urna. Nisi vitae suscipit tellus mauris a. Sagittis
          aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc.
          Ut morbi tincidunt augue interdum velit euismod. Tincidunt eget nullam
          non nisi est sit amet facilisis. Imperdiet massa tincidunt nunc
          pulvinar sapien et ligula ullamcorper malesuada.
        </Text>
      </ScrollView>

      <View className={'py-4 border-t border-gray-100'}>
        <View className={'bg-gray-50 p-3 rounded-lg mb-4 border border-gray-100'}>
          <Text className={'text-black font-bold text-xs'}>
            {t('Mandat de Prélèvement (Direct Debit Mandate)')}
          </Text>
          <Text className={'text-black mt-1 text-[10px]'}>
            {t('En signant ce contrat, j\'autorise expressément Gini à prélever automatiquement les montants dus sur mon compte/portefeuille aux dates d\'échéance convenues dans le calendrier de remboursement.')}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={() => setAuthorized(!authorized)}
          className={'flex-row items-center'}
        >
          <View className={`w-5 h-5 rounded border ${authorized ? 'bg-[#936EE3] border-[#936EE3]' : 'bg-white border-gray-200'} items-center justify-center mr-2 shadow-sm`}>
            {authorized && <CheckWhite width={12} height={12} />}
          </View>
          <Text className={'text-black text-[11px] flex-1'}>
            {t('J\'autorise expressément le prélèvement automatique (Mandat de Prélèvement)')}
          </Text>
        </TouchableOpacity>
      </View>

      <View className={'items-center mb-6'}>
        <ButtonRadius 
          onPress={() => authorized && navigation.navigate('FirstTimeLoanSignature')} 
          buttonText={t('Je souhaite signer le contrat')} 
          background={authorized} 
        />
      </View>
    </View>
  );
};

export default FirstTimeLoanContract;
