# Technical Handover Guide - Gini Platform

Welcome to the Gini Engineering Team. This document outlines the critical operational knowledge required to maintain and scale the platform.

## 🗝 Environment Configuration
The system relies on several critical keys. Ensure these are rotated every 90 days:
- `JWT_SECRET`: signing user sessions.
- `ADMIN_SECRET_KEY`: protecting back-office routes.
- `ENCRYPTION_KEY`: AES-256 key for file storage.
- `PII_ENCRYPTION_KEY`: AES-256 key for database PII fields (CNDP compliance).

## 🗄 Database Management
Gini uses **PostgreSQL**. 
- **Migrations**: We use Sequelize CLI for schema updates.
- **Ledger Integrity**: Never modify the `Transactions` table manually. Use the `ReconService.js` to fix desyncs.

## 🔌 Provider Orchestration
To swap a provider (e.g., changing Regula for a different KYC vendor):
1. Create a new provider class in `server/src/providers/`.
2. Implement the standard interface (e.g., `verifyIdentity`).
3. Update the `KycOrchestrator` constructor in `KycProvider.js` to point to the new class.

## 🛡 Security & Compliance (Morocco)
- **CNDP 09-08**: PII data must be encrypted before storage. Use `server/src/utils/crypto.js`.
- **Direct Debit**: The `autoDebitAuthorized` flag in the `Loan` model is legally required for the "Mandat de Prélèvement" flow.

## 🚀 Deployment Checklist
1. Ensure `NODE_ENV=production`.
2. Run `npm audit fix` to clear dependency vulnerabilities.
3. Configure `express-rate-limit` window settings based on expected traffic.
4. Verify all partner webhooks (Damanesign/Regula) are whitelisted in your firewall.
