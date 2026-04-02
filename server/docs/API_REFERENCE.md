# Gini Platform API Reference

All endpoints are prefixed with `/api`. Authenticated requests require the `Authorization: Bearer <token>` header.

## 🔐 Authentication (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user. Returns a JWT. |
| POST | `/login` | Authenticate an existing user. Returns a JWT. |
| POST | `/reset-pin/request` | Initiate biometric PIN reset (Regula). |
| POST | `/reset-pin/confirm` | Finalize PIN reset with temporary token. |

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
  "autoDebitAuthorized": true,
  "idempotency-key": "uuid-v4-key"
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
| POST | `/transfer` | Peer-to-peer fund transfer. |

**Payload Sample (`/transfer`):**
```json
{
  "recipientEmail": "friend@example.com",
  "amount": 200,
  "idempotency-key": "uuid-v4-key"
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

## 🛒 Merchant API (`/merchant`)
Allows external e-commerce sites to integrate Gini payments.
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/checkout` | Create a new payment request for an order. |
| POST | `/v1/confirm` | Finalize a payment (Internal callback). |

**Payload Sample (`/v1/checkout`):**
```json
{
  "amount": 450,
  "merchantId": "MARCH-001",
  "orderId": "ORD-992",
  "callbackUrl": "https://merchant.site/webhook"
}
```

## 🛠 Admin (`/admin`)
Requires `AdminToken` header.
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/loans` | Fetch all pending loan applications for review. |
| POST | `/loan/review` | Approve or reject a loan application. |
| GET | `/user/:id/risk` | Retrieve detailed CredoLab risk profile for a user. |
| POST | `/transaction/reverse` | Request a transaction reversal (Maker-Checker). |
| POST | `/action/approve` | (Super Admin) Approve a pending sensitive action. |
| GET | `/trial-balance` | View financial observability report. |
| GET | `/health` | Check system and partner connectivity. |

**Headers:**
- `admintoken`: Your authorized admin secret key.
- `Authorization`: Bearer `<admin_user_token>`.

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
