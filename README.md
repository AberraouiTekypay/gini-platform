# Gini - Microfinance 4.0 Platform

Gini is a next-generation digital banking and microfinance ecosystem designed to provide seamless financial inclusion through alternative credit scoring and instant QR-based transactions.

## 🏛 Product Vision: Microfinance 4.0
Gini transcends traditional banking by leveraging behavioral data analytics. By integrating the **CredoLab SDK**, we provide fair credit opportunities to underbanked populations, using non-traditional data points to build a robust financial identity.

## 🛠 Technology Stack
- **Mobile**: React Native (0.71.11) with TypeScript.
- **Styling**: NativeWind (Tailwind CSS for React Native).
- **State Management**: React Context API (Modularized).
- **Backend**: Node.js / Express with Sequelize ORM.
- **Database**: PostgreSQL.
- **Security**: Biometric authentication & Encrypted storage.

## 🚀 Quick Start (Development)

### 1. Active Mobile Core
```bash
# From the root directory
npm install
npx react-native start
# In a new terminal
npx react-native run-android # or run-ios
```

### 2. Backend API
```bash
cd server
npm install
npm start
```

## 📂 Repository Structure
- `./`: Active mobile application core (Target for all new PRs).
- `server/`: Production API services.
