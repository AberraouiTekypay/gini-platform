import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import DeleteSvg from '../../assets/DeleteSvg.svg';

const PinComponent: React.FC = () => {
  const [pinValue, setPinValue] = useState<string[]>([]);
  // const [errors, setErrors] = useState({}); // TODO: Use this if needed

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
  };

  return (
    <View>
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
    </View>
  );
};

export default PinComponent;
