# Architectural Overview

Gini follows a **Domain-Driven Design (DDD)** philosophy to separate complex fintech concerns into manageable modules.

## 🏗 Core Domains

### 1. Loan Domain (Alternative Scoring)
The loan lifecycle is driven by the **CredoLab behavioral engine** and internal scoring logic in `LoanEngine.js`.
- **Consent & Data**: User grants permissions in Mobile app -> `useCredoPermissions` collects behavioral metadata.
- **Scoring**: Backend calls `scoringService` (CredoLab) -> `LoanEngine` assigns Grade (A/B/Manual).
- **Tenant Routing**: `LoanEngine.routeToPartner()` selects a funding partner based on `financePreference`.
- **Contracting**: `SignatureProvider` (Damanesign) generates a legally binding agreement.
- **Approval**: If automatic, loan moves to `pending_signature`. If manual, it waits for a `CREDIT_OFFICER` in the Admin Portal.
- **Disbursement**: Partner Bank calls `/api/partner/v1/disbursement-confirm` -> Funds added to Gini Wallet.

### 2. Wallet & Payment Domain
Handles the digital ledger and real-time fund movements.
- **Double-Entry Ledger**: Every fund movement is recorded in the `Transactions` table with statuses: `INITIATED`, `PENDING_PARTNER`, `SETTLED`, `FAILED`, `REVERSED`.
- **Interoperability**: `SwitchService.js` standardizes communication with the National Payment Switch for cross-provider transfers.
- **VAS (Value Added Services)**: Bill payments and Airtime recharge handled via `VasService.js`.

### 3. Agent Network Domain
Bridges digital liquidity with physical cash through a decentralized agent network.
- **Float Management**: Agents manage a `floatBalance` for Cash-In/Cash-Out operations.
- **Security**: Cash-In is protected by a 2FA OTP sent to the customer's WhatsApp.
- **Commission Engine**: Automated 1% Agent Commission and 0.5% Gini Fee per transaction.

## 🏦 BaaS Ecosystem & Provider Orchestration
Gini functions as a "Financial Experience" layer on top of **Banking-as-a-Service (BaaS)** and specialized providers.

- **KycOrchestrator**: Modular system (e.g., `RegulaProvider`) for identity verification and biometric face matching.
- **Queueing**: `QueueService.js` (BullMQ/Redis) handles asynchronous webhook processing with retries.
- **Reconciliation**: `ReconService.js` performs daily Trial Balance checks to ensure ledger integrity.

## 🔐 Security & Audit Layer
- **PII Encryption**: AES-256-CBC used for `NationalID`, `Phone`, and `BankDetails` at rest.
- **Audit Ledger**: `AuditLog` table tracks all administrative actions for regulatory compliance.
- **Maker-Checker**: Sensitive actions (Reversals, High-value approvals) require multi-admin authorization via `PendingAction`.
- **Rate Limiting**: Protected against brute-force and XSS via `helmet` and `express-rate-limit`.
