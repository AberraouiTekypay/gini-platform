import {View, Text} from 'react-native';
import React from 'react';

import TextInputComponent from './TextInputComponent';


import { CallingCodePicker } from '@digieggs/rn-country-code-picker';


const PhoneNumberInput = ({}) => {


  return (
    <View>
    <CallingCodePicker onValueChange={() => {}} />
  </View>
  );
};

export default PhoneNumberInput;
