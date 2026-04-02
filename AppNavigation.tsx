import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WalkThrough from './src/screens/WalkThrough/WalkThrough';
import SecondWalkThrough from './src/screens/WalkThrough/SecondWalkThrough';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import SignUpOtp from './src/screens/SignUp/SignUpOtp';
import PinExplainer from './src/screens/SignUp/PinExplainer';
import Pin from './src/screens/SignUp/Pin';
import UserName from './src/screens/SignUp/UserName';
import Welcoming from './src/screens/SignUp/Welcoming';
import Dashboard from './src/screens/Dashboard/Dashboard';
import Refund from './src/screens/Refund/Refund';
import RefundAgencyFilter from './src/screens/Refund/RefundAgencyFilter';
import Wallet from './src/screens/Wallet/Wallet';
import Loans from './src/screens/Loans/Loans';
import Sponsorship from './src/screens/Sponsorship/Sponsorship';
import FirstTimeLoanForm from './src/screens/FirstTimeLoanForm/FirstTimeLoanForm';
import FirstTimeLoanRising from './src/screens/FirstTimeLoanForm/FirstTimeLoanRising';
import FirstTimeLoanEligibility from './src/screens/FirstTimeLoanForm/FirstTimeLoanEligibility';
import FirstTimeLoanPermissions from './src/screens/FirstTimeLoanForm/FirstTimeLoanPermissions';
import FirstTimeLoanAnalyse from './src/screens/FirstTimeLoanForm/FirstTimeLoanAnalyse';
import FirstTimeLoanCongratulations from './src/screens/FirstTimeLoanForm/FirstTimeLoanCongratulations';
import FirstTimeLoanProof from './src/screens/FirstTimeLoanForm/FirstTimeLoanProof';
import FirstTimeLoanCoSigner from './src/screens/FirstTimeLoanForm/FirstTimeLoanCoSigner';
import FirstTimeLoanContract from './src/screens/FirstTimeLoanForm/FirstTimeLoanContract';
import FirstTimeLoanSignature from './src/screens/FirstTimeLoanForm/FirstTimeLoanSignature';
import FirstTimeLoanApproved from './src/screens/FirstTimeLoanForm/FirstTimeLoanApproved';
import FirstTimeLoanPairingCode from './src/screens/FirstTimeLoanForm/FirstTimeLoanPairingCode';
import FastLoanForm from './src/screens/FastLoanForm/FastLoanForm';
import FastLoanFormRising from './src/screens/FastLoanForm/FastLoanFormRising';
import FastLoanFormPin from './src/screens/FastLoanForm/FastLoanFormPin';
import FastLoanFormContract from './src/screens/FastLoanForm/FastLoanFormContract';
import FastLoanFormSignature from './src/screens/FastLoanForm/FastLoanFormSignature';
import FastLoanFormPairingCode from './src/screens/FastLoanForm/FastLoanFormPairingCode';
import QrExplainer from './src/screens/QrPayment/QrExplainer';
import QrScan from './src/screens/QrPayment/QrScan';
import QrPayment from './src/screens/QrPayment/QrPayment';
import QrConfirmationPin from './src/screens/QrPayment/QrConfirmationPin';
import QrSuccess from './src/screens/QrPayment/QrSuccess';

import { I18nextProvider } from "react-i18next";
import i18n from './i18n/i18n';
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WalkThrough"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="WalkThrough" component={WalkThrough} />
          <Stack.Screen name="SecondWalkThrough" component={SecondWalkThrough} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUpOtp" component={SignUpOtp} />
          <Stack.Screen name="PinExplainer" component={PinExplainer} />
          <Stack.Screen name="Pin" component={Pin} />
          <Stack.Screen name="UserName" component={UserName} />
          <Stack.Screen name="Welcoming" component={Welcoming} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Refund" component={Refund} />
          <Stack.Screen name="RefundAgencyFilter" component={RefundAgencyFilter} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="Loans" component={Loans} />
          <Stack.Screen name="Sponsorship" component={Sponsorship} />
          <Stack.Screen name="FirstTimeLoanForm" component={FirstTimeLoanForm} />
          <Stack.Screen name="FirstTimeLoanRising" component={FirstTimeLoanRising} />
          <Stack.Screen name="FirstTimeLoanEligibility" component={FirstTimeLoanEligibility} />
          <Stack.Screen name="FirstTimeLoanPermissions" component={FirstTimeLoanPermissions} />
          <Stack.Screen name="FirstTimeLoanAnalyse" component={FirstTimeLoanAnalyse} />
          <Stack.Screen name="FirstTimeLoanCongratulations" component={FirstTimeLoanCongratulations as any} />
          <Stack.Screen name="FirstTimeLoanProof" component={FirstTimeLoanProof} />
          <Stack.Screen name="FirstTimeLoanCoSigner" component={FirstTimeLoanCoSigner} />
          <Stack.Screen name="FirstTimeLoanContract" component={FirstTimeLoanContract} />
          <Stack.Screen name="FirstTimeLoanSignature" component={FirstTimeLoanSignature} />
          <Stack.Screen name="FirstTimeLoanApproved" component={FirstTimeLoanApproved} />
          <Stack.Screen name="FirstTimeLoanPairingCode" component={FirstTimeLoanPairingCode} />
          <Stack.Screen name="FastLoanForm" component={FastLoanForm} />
          <Stack.Screen name="FastLoanFormRising" component={FastLoanFormRising} />
          <Stack.Screen name="FastLoanFormPin" component={FastLoanFormPin} />
          <Stack.Screen name="FastLoanFormContract" component={FastLoanFormContract} />
          <Stack.Screen name="FastLoanFormSignature" component={FastLoanFormSignature} />
          <Stack.Screen name="FastLoanFormPairingCode" component={FastLoanFormPairingCode} />
          <Stack.Screen name="QrExplainer" component={QrExplainer} />
          <Stack.Screen name="QrScan" component={QrScan} />
          <Stack.Screen name="QrPayment" component={QrPayment} />
          <Stack.Screen name="QrConfirmationPin" component={QrConfirmationPin} />
          <Stack.Screen name="QrSuccess" component={QrSuccess} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default AppNavigation;
