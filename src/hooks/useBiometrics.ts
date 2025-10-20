import { useState, useEffect } from 'react';
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export const useBiometrics = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometryType, setBiometryType] = useState<BiometryType | undefined>(undefined);

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      setIsAvailable(available);
      setBiometryType(biometryType);
    } catch (error) {
      console.error('Biometrics check failed:', error);
      setIsAvailable(false);
    }
  };

  const authenticate = async (): Promise<boolean> => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to unlock',
        cancelButtonText: 'Use Password',
      });
      return success;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  };

  return { isAvailable, biometryType, authenticate };
};