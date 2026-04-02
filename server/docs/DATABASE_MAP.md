# Database Schema Map

Gini uses **PostgreSQL** with Sequelize ORM. The platform maintains a strict ledger for all financial operations.

## 👤 User Model
Represents both customers, agents, and administrators.

| Field | Type | Description |
|-------|------|-------------|
| `email` | String | Unique identifier for login. |
| `role` | Enum | `user`, `admin`, `ROLE_AGENT`, `CREDIT_OFFICER`. |
| `floatBalance`| Float | Digital liquidity held by agents for CICO operations. |
| `dailyLimit` | Float | Maximum spendable amount in 24h. |
| `kycStatus` | Enum | `pending`, `verified`, `rejected`. |
| `isBlocked` | Boolean | True if the user is suspended (failed KYC or fraud). |

## 💰 Wallet Model
Holds digital currency for users. 
- **Relationship**: 1:1 with `User`.

| Field | Type | Description |
|-------|------|-------------|
| `balance` | Float | Current available funds in MAD. |
| `currency` | String | `MAD` (Default). |

## 📝 Transaction Ledger
The source of truth for all fund movements. Uses a state-based lifecycle.

| Field | Type | Description |
|-------|------|-------------|
| `amount` | Float | Transaction value. |
| `type` | Enum | `loan`, `repayment`, `purchase`, `deposit`, `CASH_IN`, `CASH_OUT`, `COMMISSION`. |
| `status` | Enum | `INITIATED`, `PENDING_PARTNER`, `SETTLED`, `FAILED`, `REVERSED`. |
| `reference` | String | Internal Gini unique identifier. |
| `providerName`| String | (e.g., GiniBank, Damanesign, Regula). |
| `fraudAlert` | Boolean | True if the transaction triggered AML review (> 10,000 MAD). |

**Settlement Flow**:
1. `INITIATED`: Transaction record created before provider call.
2. `SETTLED`: Funds moved successfully (wallet updated).
3. `FAILED`: Provider error or insufficient funds.

## 🏦 Loan Model
Maintains loan state and repayment schedules.

| Field | Type | Description |
|-------|------|-------------|
| `amount` | Float | Principal amount. |
| `status` | Enum | `pending`, `pending_signature`, `active`, `repaid`, `rejected`. |
| `creditGrade` | String | Assigned by `LoanEngine` (A, B, Manual Review). |
| `interestRate`| Float | Annualized interest rate (5% to 15%). |
| `repaymentSchedule` | JSON | Array of monthly installment objects. |
| `autoDebitAuthorized`| Boolean | True if user signed the "Mandat de Prélèvement". |
| `signatureStatus` | Enum | `PENDING`, `SIGNED`, `FAILED`. |
