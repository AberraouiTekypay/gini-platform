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
Requires `AdminToken` header.
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/loans` | Fetch all pending loan applications for review. |
| POST | `/loan/review` | Approve or reject a loan application. |
| GET | `/user/:id/risk` | Retrieve detailed CredoLab risk profile for a user. |

**Headers:**
- `admintoken`: Your authorized admin secret key.
- `Authorization`: Bearer `<admin_user_token>`.

**Payload Sample (`/loan/review`):**
```json
{
  "loanId": 1,
  "status": "approved",
  "adminNotes": "Low risk profile confirmed.",
  "reviewerId": 99
}
```
