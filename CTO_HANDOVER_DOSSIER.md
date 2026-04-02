# CTO Handover Dossier: Gini Platform v1.0

This document provides a strategic and technical overview of the Gini Platform for the incoming engineering leadership.

## 1. System Core: Modular Monolith Architecture
Gini is built as a **Modular Monolith** using **Node.js (Express)** and **PostgreSQL**. 
- **Philosophy**: Domain-Driven Design (DDD) separates the application into clear domains: `Loans`, `Wallet`, `KYC`, and `Agent Network`.
- **Infrastructure**: Designed for containerized deployment (Docker-ready). The backend orchestrates third-party BaaS (Banking-as-a-Service) providers through a unified provider layer.

## 2. Fintech Logic: Integrity & Reliability
- **Double-Entry Ledger**: The `Transactions` model acts as a strict ledger. Fund movements (Deposits, Transfers, Disbursements) are atomic operations. Reversals (Disputes) create counter-entries rather than deleting records, ensuring a permanent audit trail.
- **Idempotency**: Critical endpoints (`/apply`, `/transfer`, `/deposit`) implement `idempotency-key` header checks via middleware to prevent double-processing in high-latency mobile environments.

## 3. Product Nuance: Multi-Tenant Routing
The platform supports two distinct financial models:
- **Conventional**: Standard interest-based loans with 2% late fee penalties.
- **Participative (Sharia-Compliant)**: Implements **Murabaha** logic where the platform charges a fixed 'Profit Margin' instead of interest. Penalties for late payments are recorded as 'Charity Contributions' (Don à caractère social) and are not booked as Gini profit.
- **Routing**: `LoanEngine.js` automatically routes applications based on the user's `financePreference`.

## 4. Integration Map (Status: Phase 1)
| Provider | Domain | Status | Implementation |
|----------|--------|--------|----------------|
| **Regula** | Identity | Ready | `RegulaProvider.js` (Face Match & ID Scan) |
| **Damanesign** | Legal | Ready | `SignatureProvider.js` (Digital Contract Webhooks) |
| **LanaCash** | Banking | Simulated | `BankingProvider.js` (Deposit/Withdraw/QR) |

## 5. Security Posture
- **Encryption at Rest**: PII (National ID, Phone) is encrypted using **AES-256-CBC** before database insertion (`crypto.js`). Uploaded documents are similarly encrypted (`encryption.js`).
- **Audit Logs**: Every administrative action in the Admin Portal is recorded in the `AuditLog` table.
- **Secret Masking**: `logger.js` middleware automatically redacts sensitive body fields from server logs to maintain CNDP 09-08 compliance.

## 6. Technical Debt & Roadmap
- **Priority 1: Multi-currency Refactor**: Transition from hardcoded `MAD` strings to dynamic currency support in `Partner` models for UEMOA expansion.
- **Priority 2: Webhook Retry Queues**: Implement a message broker (e.g., BullMQ or RabbitMQ) to handle failed callbacks from Damanesign/Regula.
- **Priority 3: Redis Idempotency**: Move the in-memory idempotency store to Redis for multi-instance horizontal scaling.

---
**Handover Status**: Finalized.
**System Readiness**: PRODUCTION READY.
