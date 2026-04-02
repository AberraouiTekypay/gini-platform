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
## 🛠 Admin & Operations Workflow
Back-office operations are managed via the **Gini Admin Portal**, which interfaces with the administrative backend API.
- **Flow**: Pending Loan Entry -> Admin Portal Dashboard -> CredoLab Risk Review -> Approval/Rejection Action.
- **Security**: Admin routes are protected by the `AdminToken` middleware, requiring an authorized secret key for all state-changing operations.
- **Audit**: All administrative actions (status updates, notes) are persisted with the reviewer's ID and timestamp in the PostgreSQL ledger.

## 🏦 BaaS Ecosystem (LanaCash)
Gini functions as a "Financial Experience" layer on top of **Banking-as-a-Service (BaaS)** providers like **LanaCash**.
- **Wallet Orchestration**: User balances and physical card issuing are offloaded to LanaCash's ledger via secure webhook/API sync.
- **Transaction settlement**: When a QR payment or loan disbursement occurs, Gini's server orchestrates the movement of funds through the LanaCash transaction engine.
- **Compliance**: KYC (Know Your Customer) and AML (Anti-Money Laundering) checks are delegated to the BaaS provider, with Gini consuming the resulting "Verified" status.

## 🔐 Security Layer

Gini functions as a "Financial Experience" layer on top of **Banking-as-a-Service (BaaS)** providers like **LanaCash**.
- **Wallet Orchestration**: User balances and physical card issuing are offloaded to LanaCash's ledger via secure webhook/API sync.
- **Transaction settlement**: When a QR payment or loan disbursement occurs, Gini's server orchestrates the movement of funds through the LanaCash transaction engine.
- **Compliance**: KYC (Know Your Customer) and AML (Anti-Money Laundering) checks are delegated to the BaaS provider, with Gini consuming the resulting "Verified" status.

## 🔐 Security Layer

## 🏦 BaaS Ecosystem (LanaCash)
Gini functions as a "Financial Experience" layer on top of **Banking-as-a-Service (BaaS)** providers like **LanaCash**.
- **Wallet Orchestration**: User balances and physical card issuing are offloaded to LanaCash's ledger via secure webhook/API sync.
- **Transaction settlement**: When a QR payment or loan disbursement occurs, Gini's server orchestrates the movement of funds through the LanaCash transaction engine.
- **Compliance**: KYC (Know Your Customer) and AML (Anti-Money Laundering) checks are delegated to the BaaS provider, with Gini consuming the resulting "Verified" status.

## 🔐 Security Layer
All sensitive operations (PIN entry, Card display) are wrapped in specialized animated containers that require fresh biometric/PIN validation before revealing PII.
