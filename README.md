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

## 🚀 Developer Quickstart (Development)

The platform is a modular monorepo. Follow these steps for local setup:

### Step 1: Mobile Core (React Native)
From the root directory, install dependencies and start the Metro bundler.
```bash
npm install
npx react-native start
# In a new terminal
npx react-native run-android # or run-ios
```

### Step 2: Backend API (Node.js)
Navigate to the server directory, install dependencies, and start the API server.
```bash
cd server
npm install
npm start
```

### Step 3: Admin Portal (Web Dashboard)
Navigate to the admin portal directory and serve the static files or install dependencies.
```bash
cd server/admin-portal
# Use a local server (e.g., Live Server or python -m http.server)
# Default API endpoint: http://localhost:5000/api/admin
```

## 📱 WhatsApp Mocking (Local Testing)
For local development, the WhatsApp 2FA flow is simulated in the `NotificationService.js`.
1. Initiate a **Cash-In** operation via the `/api/agent/cash-in` endpoint.
2. Check the **Server Console Logs** to see the simulated WhatsApp message.
3. Use the static code `1234` to verify the transaction in development.

## 📁 Documentation
Detailed blueprints and guides are located in `server/docs/`:
- **[API Reference](server/docs/API_REFERENCE.md)**
- **[Database Map](server/docs/DATABASE_MAP.md)**
- **[Architecture Blueprint](ARCHITECTURE.md)**
