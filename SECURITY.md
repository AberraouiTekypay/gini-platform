# Security & Data Privacy Policy

As a fintech platform, Gini adheres to strict security protocols to protect User PII (Personally Identifiable Information) and financial integrity.

## 🛡 Data Protection Standards

### 1. Credentials & Token Management
- **Persistence**: API tokens and User Secrets MUST NOT be stored in standard `AsyncStorage`.
- **Implementation**: Use `react-native-keychain` for secure enclave storage of authentication tokens.

### 2. Local State Encryption
- **Policy**: Any sensitive financial data cached locally must be encrypted.
- **Implementation**: Gini utilizes **MMKV with encryption** for high-performance, secure local storage.

### 3. Biometric Guardrails
- High-value actions (Loan acceptance, QR Payments, CVV reveal) require an active `Fingerprint/FaceID` check via `react-native-biometrics`.

## 📵 CredoLab Privacy
Behavioral data collection is **strictly opt-in**. The `useCredoPermissions` hook ensures that no data collection starts until the user has explicitly granted "Read SMS" and "Read Contacts" permissions via the institutional consent screen.

## 🚀 Environment Security
- Hardcoded API keys are strictly forbidden. 
- All environment variables must be registered in `.env.example` and accessed via the type-safe `src/config/env.ts` wrapper.
