# Gini Platform v1.0 - Digital Microfinance for Morocco 🇲🇦

Gini is a high-performance, multi-tenant financial platform designed to bridge the gap in financial inclusion through alternative credit scoring and instant digital liquidity. Built for the Moroccan market, Gini supports both **Conventional** and **Participative (Islamic)** finance models.

## 🏛 Platform Vision
Gini transforms behavioral data into financial opportunity. By leveraging the **CredoLab SDK** and a modular **BaaS Orchestrator**, we provide unbanked and underbanked populations with access to fair, transparent, and regulated financial services.

## 🛠 Enterprise Tech Stack
| Layer | Technology |
|-------|------------|
| **Mobile** | React Native (0.71), TypeScript, NativeWind |
| **Backend** | Node.js, Express, Sequelize ORM |
| **Database** | PostgreSQL (Hardened with PII Encryption) |
| **Scoring** | CredoLab SDK (Behavioral Analytics) |
| **Compliance** | Regula (KYC), Damanesign (Digital Signature) |
| **Hardening** | AES-256-CBC Encryption, CNDP 09-08 Alignment |

## 🚀 10-Minute Local Setup

### 1. Root & Mobile Core
```bash
npm install
npx react-native start
# In a new terminal
npx react-native run-android # or run-ios
```

### 2. Backend API
```bash
cd server
npm install
# Create .env from .env.example
npm start
```

### 3. Admin Dashboard
The Admin Portal is a standalone static dashboard located in `server/admin-portal`.
```bash
cd server/admin-portal
# Serve using any static server (e.g., Live Server or python -m http.server)
```

## 📱 WhatsApp 2FA Mocking
In development mode, 2FA codes are printed to the server console. Use the static code `1234` to bypass verification for Cash-In operations.

## 📂 Internal Documentation
- **[API Reference](server/docs/API_REFERENCE.md)**: Full endpoint documentation.
- **[Architecture Blueprint](ARCHITECTURE.md)**: System design and logic flows.
- **[Database Map](server/docs/DATABASE_MAP.md)**: Schema and ledger definitions.
- **[Handover Guide](HANDOVER.md)**: Transition notes for technical teams.
