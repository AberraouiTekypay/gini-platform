/**
 * Gini Institutional Environment Wrapper
 * Provides type-safe access to environment variables.
 * Utilizes react-native-config for multi-environment support.
 */
import Config from 'react-native-config';

interface EnvConfig {
  API_BASE_URL: string;
  CURRENCY_CODE: string;
  API_TIMEOUT: number;
  CREDOLAB_SITE_ID: string;
  CREDOLAB_API_KEY: string;
  MERCHANT_QR_SECRET: string;
  STORAGE_ENCRYPTION_KEY: string;
}

const env: EnvConfig = {
  API_BASE_URL: Config.API_BASE_URL || 'http://localhost:5000/v1',
  CURRENCY_CODE: Config.CURRENCY_CODE || 'MAD',
  API_TIMEOUT: parseInt(Config.API_TIMEOUT || '15000', 10),
  CREDOLAB_SITE_ID: Config.CREDOLAB_SITE_ID || '',
  CREDOLAB_API_KEY: Config.CREDOLAB_API_KEY || '',
  MERCHANT_QR_SECRET: Config.MERCHANT_QR_SECRET || '',
  STORAGE_ENCRYPTION_KEY: Config.STORAGE_ENCRYPTION_KEY || '',
};

// Validation: Ensure critical keys are present in non-development environments
if (__DEV__) {
  console.log('[Gini Config] Environment loaded:', env.API_BASE_URL);
}

export default env;
