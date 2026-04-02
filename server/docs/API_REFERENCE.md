# Gini Platform API Reference

All endpoints are prefixed with `/api`. Authenticated requests require the `Authorization: Bearer <token>` header.

## 🔐 Authentication (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user. Returns a JWT. |
| POST | `/login` | Authenticate an existing user. Returns a JWT. |

**Payload Sample (`/register`):**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

## 🏦 Loans (`/loans`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/apply` | Apply for a new loan. Triggers alternative scoring. |
| GET | `/` | List all loans for the authenticated user. |
| GET | `/:id` | Retrieve details for a specific loan. |
| POST | `/:id/repay` | Manually initiate a loan repayment. |
| POST | `/:id/sign` | Simulate signing the loan contract (Damanesign). |

**Payload Sample (`/apply`):**
```json
{
  "amount": 5000,
  "autoDebitAuthorized": true
}
```

## 🆔 KYC (`/kyc`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/verify` | Submit ID images for identity verification (Regula). |

**Payload Sample (`/verify`):**
```json
{
  "images": ["base64_img1", "base64_img2"]
}
```

## 💳 Wallet (`/wallet`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/balance` | Retrieve current wallet balance. |
| POST | `/deposit` | Deposit funds (simulated). |

**Payload Sample (`/deposit`):**
```json
{
  "amount": 1000
}
```

## 👥 Agent CICO (`/agent`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/cash-in` | Agent initiates a cash-in deposit for a customer. |
| POST | `/cash-out` | Customer initiates a cash-out withdrawal with an agent. |

**Payload Sample (`/cash-in`):**
```json
{
  "customerId": 123,
  "amount": 1000,
  "otpCode": "1234"
}
```

## 🛠 Admin (`/admin`)
...
**Payload Sample (`/loan/review`):**
```json
{
  "loanId": 1,
  "status": "approved",
  "adminNotes": "Low risk profile confirmed.",
  "reviewerId": 99
}
```

---

# 🤝 Partner API Standard (`/partner`)

External Banks and Participative MFIs connect to Gini via this interface. All requests require `Partner-API-Key`.

## 🔄 Lifecycle Webhooks
Partners should implement a listener for Gini's `webhookUrl` to receive application alerts.

### 1. Confirm Disbursement
**POST** `/api/partner/v1/disbursement-confirm`

Called by the Bank's core banking system to confirm funds have been moved to the Gini transit account.

**Headers:**
- `Partner-API-Key`: `<your_assigned_key>`

**Payload:**
```json
{
  "loanId": 105,
  "providerReference": "CB-TX-998234",
  "status": "SUCCESS"
}
```

### 2. Reconciliation Pulse
**GET** `/api/partner/v1/recon` (Planned)
Returns a list of all `SETTLED` transactions for the current billing cycle.

