# Gini Platform - Developer Onboarding Handbook

Welcome to the Gini Engineering Team. This document outlines the core principles and workflows required to maintain the integrity of our financial engine.

## 🏛 Platform Core Principles

### 1. The Immutable Ledger Rule
The `Transactions` table is the absolute source of truth. 
- **CRITICAL**: NEVER modify or delete a transaction row directly in the database.
- **Rule**: If a mistake is made, you must issue a **Reversal Transaction** (counter-entry) to correct the balance. This ensures a permanent, auditable trail of all fund movements.

### 2. Maker-Checker Flow (Four-Eyes Principle)
To prevent fraud and operational errors, high-risk actions require dual-authorization.
- **Actions**: Transaction reversals, manual KYC overrides, and loans > 10,000 MAD.
- **Workflow**: 
    1. **Maker**: Initiates the request (creates a `PendingAction`).
    2. **Checker**: A second administrator (with `SUPER_ADMIN` role) reviews and approves the action.

## 🛠 Technical Stack
- **Backend**: Node.js (Express), Sequelize ORM, Winston (Logging).
- **State**: PostgreSQL (Primary), Redis (Idempotency & Sessions).
- **Async**: BullMQ (Webhook processing & Retries).
- **Mobile**: React Native, NativeWind, CredoLab SDK.

## 🚀 Getting Started
1. Copy `server/.env.example` to `server/.env`.
2. Ensure Docker is running and execute `docker-compose up`.
3. The server will default to **MOCK mode** for providers if no production keys are found in `.env`.

## 🔒 Security Standards
- **PII**: All user PII (National ID, Phone) must be encrypted using `src/utils/crypto.js` before storage.
- **Audit**: Every admin action must be logged in the `AuditLog` table.
