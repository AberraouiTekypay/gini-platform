import {View, Text, TouchableOpacity,} from 'react-native';
import React, {useState} from 'react';

import LogoSvg from '../../assets/LogoSvg.svg';
import LanguageSvg from '../../assets/LanguageSvg.svg';
import LogoBlackSvg from '../../assets/LogoBlackSvg.svg';
import LanguageBlackSvg from '../../assets/LanguageBlackSvg.svg'

import i18n from "../../i18n/i18n"

interface HeaderProps {
  normal?: boolean;
}

const Header: React.FC<HeaderProps> = ({normal}) => {
  const languages = ['Ar', 'Fr', 'En', 'Am'];

  const [dropDown, setDropDown] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  const handleLanguage = (language: string) => {
    setActiveLanguage(language);
    i18n.changeLanguage(language)
    setDropDown(false)
  };

  const HandleDropDown = () => {
    setDropDown(!dropDown);
  };

  
  

  return (
    <View className={'flex-row justify-between w-full z-10'}>
      {
        normal ?  <LogoSvg /> : <LogoBlackSvg />
      }
      <View className={'justify-center'}>
        <TouchableOpacity
          className={'flex-row items-center justify-between w-12'}
          onPress={HandleDropDown}>
          {normal ? <LanguageSvg /> : <LanguageBlackSvg />}
          <Text className={' px-1 font-base text-xs'} style={{color: normal ? '#ccc' : 'black'}}>
            {activeLanguage}
          </Text>
          <View className={'absolute flex gap-2 top-[30px]'}>
          {dropDown
            ? languages.map((language, id) => (
                  <TouchableOpacity
                  key={id}
                    onPress={() => handleLanguage(language)}
                    className={'border-[2px] rounded-full h-8 w-8'} style={{borderColor: normal ? '#BBBCBA' : 'black'}}>
                    <Text className={' font-bold text-xs pt-1 self-center'} style={{color: normal ? '#ccc' : 'black'}}>
                      {language}
                    </Text>
                  </TouchableOpacity>
              ))
            : null}
        </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default Header;
