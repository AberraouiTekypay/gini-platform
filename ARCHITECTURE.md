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

## 🏦 BaaS Ecosystem & Provider Orchestration
Gini functions as a "Financial Experience" layer on top of **Banking-as-a-Service (BaaS)** and specialized providers. The system uses an orchestration pattern to remain provider-agnostic.

- **KycOrchestrator**: Modular system (e.g., `RegulaProvider`) for identity verification. It handles document scanning and biometric selfies, automatically blocking users on failure.
- **SignatureProvider**: Integrated with **Damanesign** for legal digital contracts. Loans transition to `active` only after a `SIGNED` status is received via webhook.
- **BankingProvider**: Orchestrates fund movements (deposits, withdrawals, QR payments) through partner ledgers (simulated for GiniBank).

## 🧠 Loan Decision Engine
The loan lifecycle is driven by the **CredoLab behavioral engine** and internal scoring logic in `LoanEngine.js`.

- **Risk Grading**:
    - **Grade A** (Score > 700): 5% Interest, automatic approval.
    - **Grade B** (Score 400-700): 10% Interest, standard approval.
    - **Manual Review** (Score < 400): 15% Interest, requires Credit Officer intervention.
- **Amortization Math**: Implemented in `finance.js`. Returns a detailed repayment schedule including:
    - **VAT (TVA)**: 20% on interest.
    - **Insurance**: 1% flat fee on principal.
    - **Repayment**: Monthly installments calculated on total cost.

## 👥 Agent CICO Network (Cash-In/Cash-Out)
...
    - Recorded in the ledger with `type: 'COMMISSION'`.

## 🔄 End-to-End Loan Flow (Technical)
1. **Consent & Data**: User grants permissions in Mobile app -> `useCredoPermissions` collects behavioral metadata.
2. **Scoring**: Backend calls `scoringService` (CredoLab) -> `LoanEngine` assigns Grade (A/B/Manual).
3. **Tenant Routing**: `LoanEngine.routeToPartner()` selects a funding partner based on `financePreference`.
4. **Contracting**: `SignatureProvider` (Damanesign) generates a legally binding agreement.
5. **Approval**: If automatic, loan moves to `pending_signature`. If manual, it waits for a `CREDIT_OFFICER` in the Admin Portal.
6. **Disbursement**: Partner Bank calls `/api/partner/v1/disbursement-confirm` -> Funds added to Gini Wallet.

## 🔐 Security & Audit Layer
- **PII Encryption**: AES-256-CBC used for `NationalID`, `Phone`, and `BankDetails` at rest.
- **Audit Ledger**: `AuditLog` table tracks all administrative actions for regulatory compliance.
- **Idempotency**: Prevent double-spending via `idempotency-key` header on critical state-changing routes.

