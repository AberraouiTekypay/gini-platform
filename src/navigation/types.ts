import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  WalkThrough: undefined;
  SecondWalkThrough: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SignUpOtp: undefined;
  PinExplainer: undefined;
  Pin: undefined;
  UserName: undefined;
  Welcoming: undefined;
  Dashboard: undefined;
  Refund: undefined;
  RefundAgencyFilter: undefined;
  Wallet: undefined;
  Loans: undefined;
  Sponsorship: undefined;
  FirstTimeLoanForm: undefined;
  FirstTimeLoanRising: undefined;
  FirstTimeLoanEligibility: undefined;
  FirstTimeLoanPermissions: undefined;
  FirstTimeLoanAnalyse: undefined;
  FirstTimeLoanCongratulations: {
    firstText: string;
    secondText: string;
    nextScreen: keyof RootStackParamList;
    buttonText: string;
  };
  FirstTimeLoanProof: undefined;
  FirstTimeLoanCoSigner: undefined;
  FirstTimeLoanContract: undefined;
  FirstTimeLoanSignature: undefined;
  FirstTimeLoanApproved: undefined;
  FirstTimeLoanPairingCode: undefined;
  FastLoanForm: undefined;
  FastLoanFormRising: undefined;
  FastLoanFormPin: undefined;
  FastLoanFormContract: undefined;
  FastLoanFormSignature: undefined;
  FastLoanFormPairingCode: undefined;
  QrExplainer: undefined;
  QrScan: undefined;
  QrPayment: undefined;
  QrConfirmationPin: undefined;
  QrSuccess: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
