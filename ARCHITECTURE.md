# Architectural Overview

Gini follows a **Domain-Driven Design (DDD)** philosophy to separate complex fintech concerns into manageable modules.

## 🏗 Core Domains

### 1. Loan Domain (Alternative Scoring)
The loan lifecycle is driven by the **CredoLab behavioral engine**. 
- **Flow**: User Consent -> `useCredoPermissions` hook -> SDK Data Collection -> Backend Scoring -> Eligibility Determination.
- **Key Logic**: Data collection is anonymized and transmitted directly to the scoring cloud, with session identifiers synced to our PostgreSQL ledger for final approval.

### 2. Payment Domain (QR Transaction Ledger)
Real-time merchant payments are handled via a multi-step verification stack.
- **Flow**: QR Scan (Vision Camera) -> Merchant Validation -> User PIN/Biometric Confirmation -> Atomic Wallet Deduction.
- **Integrity**: Transactions are atomic to ensure no double-spending or wallet desync.

## 📦 Legacy Consolidation
The project was recently consolidated from its previous separate repositories into this unified monorepo structure.
- **Migration Logic**: Features were surgically ported to a strict TypeScript environment.
- **Archive Policy**: Legacy folders are now consolidated into the main root-level structure.
## 🔐 Security Layer
All sensitive operations (PIN entry, Card display) are wrapped in specialized animated containers that require fresh biometric/PIN validation before revealing PII.
