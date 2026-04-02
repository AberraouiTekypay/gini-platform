import { PermissionsAndroid, Platform } from 'react-native';
import CredoBehavioral from '@credolab/react-behavioral';

export const useCredoPermissions = () => {
  const requestCredoData = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        if (grants['android.permission.READ_SMS'] === 'granted') {
          // Initialize CredoLab collection after consent
          console.log("Consent granted, starting CredoLab collection...");
          await CredoBehavioral.collect();
          console.log("CredoLab Data Collection Started");
        } else {
          console.log("SMS Permission denied, CredoLab collection skipped.");
        }
      } catch (err) {
        console.error("Error during permission request or CredoLab collection:", err);
      }
    } else if (Platform.OS === 'ios') {
        // iOS specific logic if needed
        console.log("iOS detected, handling CredoLab collection for iOS...");
        try {
            await CredoBehavioral.collect();
            console.log("CredoLab Data Collection Started on iOS");
        } catch (err) {
            console.error("CredoLab Collection Failed on iOS", err);
        }
    }
  };

  return { requestCredoData };
};
