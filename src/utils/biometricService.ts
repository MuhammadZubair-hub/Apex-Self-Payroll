import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: false });

// AsyncStorage keys
const BIOMETRIC_ENABLED_KEY = '@biometric_enabled';
const BIO_EMAIL_KEY = '@bio_email';
const BIO_PASSWORD_KEY = '@bio_password';

/**
 * Check if the device supports biometric authentication (fingerprint / face).
 * Returns an object with `available` boolean and `biometryType` string.
 */
export const isBiometricAvailable = async (): Promise<{
  available: boolean;
  biometryType: string | undefined;
}> => {
  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    return { available, biometryType };
  } catch {
    return { available: false, biometryType: undefined };
  }
};

/**
 * Check if the user has previously enabled biometric login.
 */
export const isBiometricEnabled = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY);
    return value === 'true';
  } catch {
    return false;
  }
};

/**
 * Save user credentials in AsyncStorage.
 * Called on every successful normal login so credentials stay up-to-date.
 */
export const saveCredentials = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(BIO_EMAIL_KEY, email);
    await AsyncStorage.setItem(BIO_PASSWORD_KEY, password);
  } catch (error) {
    console.warn('Failed to save biometric credentials:', error);
  }
};

/**
 * Enable biometric login.
 * Verifies that biometrics are available and prompts the user to confirm
 * with their biometric. If successful, sets the enabled flag.
 * 
 * NOTE: Credentials should already be saved via `saveCredentials` during
 * the last successful login.
 */
export const enableBiometric = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { available, biometryType } = await isBiometricAvailable();
    if (!available) {
      return {
        success: false,
        error: 'Biometric authentication is not available on this device',
      };
    }

    // Check if credentials exist from a previous login
    const savedEmail = await AsyncStorage.getItem(BIO_EMAIL_KEY);
    if (!savedEmail) {
      return {
        success: false,
        error: 'Please login with your credentials first before enabling biometric',
      };
    }

    // Prompt user to verify biometric
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: 'Confirm your identity to enable biometric login',
      cancelButtonText: 'Cancel',
    });

    if (!success) {
      return { success: false, error: 'Biometric verification cancelled' };
    }

    await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Biometric setup failed: ${error}`,
    };
  }
};

/**
 * Disable biometric login.
 * Clears the enabled flag and removes saved credentials.
 */
export const disableBiometric = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(BIOMETRIC_ENABLED_KEY);
    await AsyncStorage.removeItem(BIO_EMAIL_KEY);
    await AsyncStorage.removeItem(BIO_PASSWORD_KEY);
  } catch (error) {
    console.warn('Failed to disable biometric:', error);
  }
};

/**
 * Prompt biometric authentication and return saved credentials if successful.
 * Used on the Login screen when the user taps the biometric button.
 */
export const authenticateAndGetCredentials = async (): Promise<{
  success: boolean;
  email?: string;
  password?: string;
  error?: string;
}> => {
  try {
    const enabled = await isBiometricEnabled();
    if (!enabled) {
      return { success: false, error: 'Biometric login is not enabled' };
    }

    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: 'Login with biometric',
      cancelButtonText: 'Cancel',
    });

    if (!success) {
      return { success: false, error: 'Authentication cancelled' };
    }

    const email = await AsyncStorage.getItem(BIO_EMAIL_KEY);
    const password = await AsyncStorage.getItem(BIO_PASSWORD_KEY);

    if (!email || !password) {
      // Credentials were cleared (e.g. user disabled biometric externally)
      await disableBiometric();
      return {
        success: false,
        error: 'Saved credentials not found. Please login manually and re-enable biometric.',
      };
    }

    return { success: true, email, password };
  } catch (error) {
    return { success: false, error: `Biometric authentication failed: ${error}` };
  }
};

/**
 * Get a human-readable label for the biometry type.
 */
export const getBiometryLabel = (biometryType?: string): string => {
  switch (biometryType) {
    case BiometryTypes.FaceID:
      return 'Face ID';
    case BiometryTypes.TouchID:
      return 'Touch ID';
    case BiometryTypes.Biometrics:
      return 'Fingerprint';
    default:
      return 'Biometric';
  }
};
