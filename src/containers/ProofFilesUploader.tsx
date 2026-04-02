import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';

import CameraSvg from '../../assets/CameraSvg.svg';
import InfoSvg from '../../assets/InfoSvg.svg';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

interface ProofFilesUploaderProps {
  Texts: {
    title: string;
    mainText: string;
    info: boolean;
  };
  setIsUploaded: (isUploaded: boolean) => void;
}

const ProofFilesUploader: React.FC<ProofFilesUploaderProps> = ({Texts, setIsUploaded}) => {
  const { t } = useTranslation();
  const { title, mainText, info } = Texts;
  // const [selectedImage, setSelectedImage] = useState<any>(null); // TODO: Type this properly
  const [valid, setValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePicker = () => {
    setModalVisible(true);
  };

  const handleUploadFromDevice = () => {
    // const options = {
    //   mediaType: 'photo',
    // };
    // TODO: Implement launchImageLibrary and use setSelectedImage(response), setIsUploaded(true), setValid(true), setModalVisible(false)
  };

  const handleTakePhoto = () => {
    // const options = {
    //   mediaType: 'photo',
    // };
    // TODO: Implement launchCamera and use setSelectedImage(response), setIsUploaded(true), setValid(true), setModalVisible(false)
  };

  return (
    <>
    <TouchableOpacity
      onPress={handleImagePicker}
      className={
        'flex-row items-center justify-between  h-[125px] rounded-xl bg-[#F5F3F3] my-1 border-r-[30px] border-l-4 border-t-4 border-b-4'
      } style={{borderColor: valid ? 'green' : '#936EE3'}}>
      <View>
        <View className={'flex-row my-4 items-center'}>
          <CameraSvg />
          <View className={'ml-4'}>
            <Text className={'text-black font-semibold '}>{t(title)}</Text>
            <Text className={'text-[#ccc]'}>{t(mainText)}</Text>
          </View>
        </View>

        {info ? (
          <View className={'flex-row justify-end items-center ml-32'}>
            <Text className={'mr-1 text-black'}>
            {t('En savoir plus sur ce prêt')}
            </Text>
            <InfoSvg />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Choose Image Source</Text>
            <TouchableOpacity onPress={handleUploadFromDevice} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 18 }}>Upload from Device</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTakePhoto}>
              <Text style={{ fontSize: 18 }}>Take a New Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 18, color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProofFilesUploader;
