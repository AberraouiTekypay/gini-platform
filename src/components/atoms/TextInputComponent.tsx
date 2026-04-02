import { View, Text, TextInput, KeyboardTypeOptions, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React from 'react'

interface TextInputComponentProps {
  Title: string;
  onChangeText: (text: string) => void;
  keyBoard?: KeyboardTypeOptions;
  placeholder?: string;
  textSecure?: boolean;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  Title,
  onChangeText,
  keyBoard = undefined,
  placeholder = undefined,
  textSecure = undefined
}) => {

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    onChangeText(e.nativeEvent.text)    
  }

  return (
    <View className={'flex items-start mt-3'}>
      <Text className={'text-black text-sm font-semibold mb-1'}>{Title}</Text>
      <TextInput 
        className={'bg-[#dbdbdb] h-[64px] w-full px-4 text-black'} 
        placeholder={placeholder} 
        keyboardType={keyBoard} 
        onChange={handleChange} 
        secureTextEntry={textSecure}
      />
    </View>
  )
}

export default TextInputComponent;
