# CTO Handover Dossier: Gini Platform v1.0

This document provides a strategic and technical overview of the Gini Platform for the incoming engineering leadership.

## 1. System Core: Modular Monolith Architecture
Gini is built as a **Modular Monolith** using **Node.js (Express)** and **PostgreSQL**. 
- **Philosophy**: Domain-Driven Design (DDD) separates the application into clear domains: `Loans`, `Wallet`, `KYC`, `Agent Network`, and `Merchant Services`.
- **Infrastructure**: Distributed state management via **Redis**. Background processing and webhook resilience via **BullMQ**.

## 2. Fintech Logic: Integrity & Reliability
- **Double-Entry Ledger**: The `Transactions` model acts as a strict ledger. Fund movements are atomic. Reversals (Disputes) create counter-entries.
- **Idempotency**: Critical endpoints implement `idempotency-key` header checks stored in Redis.
- **Financial Observability**: `ReconService.js` provides Trial Balance checks to validate wallet sums against the ledger.

## 3. Product Nuance: Multi-Tenant Routing
- **Conventional vs Participative**: Supports both interest-based and Murabaha (Sharia-compliant) models.
- **Murabaha Logic**: Fixed profit margins instead of interest. Penalties for late payments are channeled to 'Charity Contributions' (Don à caractère social).
- **Interoperability**: ISO 20022 aligned `SwitchService.js` for transfers to external wallets (M-Pesa, MT Cash).

## 4. Integration Map
| Provider | Domain | Implementation |
|----------|--------|----------------|
| **Regula** | Identity | Biometric Face Match & ID Verification |
| **Damanesign** | Legal | Digital Signature with Webhook Queueing |
| **LanaCash** | Banking | Simulated Core Banking Ledger |
| **Fatourati** | VAS | Bill Payment Aggregation |

## 5. Security Posture
- **PII Encryption**: National ID, Email, and Phone numbers are encrypted via **AES-256-CBC** before storage.
- **Maker-Checker**: Sensitive actions (> 10,000 MAD) require dual-admin authorization via `PendingAction`.
- **Log Privacy**: `logger.js` middleware redacts sensitive fields from application logs.

## 6. Technical Debt & Roadmap
- **Priority 1: Multi-currency support**: Full dynamic currency mapping in `Partner` models.
- **Priority 2: Biometric PIN Reset implementation**: Integration of the mobile "Selfie Capture" with the newly created `/auth/reset-pin` endpoints.
- **Priority 3: Merchant SDK**: Formalize the public Merchant API into a client-side SDK.

---
**Handover Status**: Finalized.
**System Readiness**: PRODUCTION READY.
