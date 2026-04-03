# Bank Al-Maghrib (BAM) & CNDP Compliance Mapping

This document maps the Gini Platform's technical features to the regulatory requirements of the Moroccan financial ecosystem.

## 🛡️ Data Privacy (CNDP Law 09-08)
| Requirement | Technical Implementation | File Reference |
|-------------|--------------------------|----------------|
| Encryption of sensitive PII | AES-256-CBC encryption before DB storage. | `utils/crypto.js` |
| Right to be Forgotten | Automated anonymization scripts for user deletion. | `scripts/anonymizeUser.js` |
| Privacy in Logging | Automated masking of IDs/Phones in application logs. | `middlewares/logger.js` |

## 🏦 Banking Integrity (BAM Guidelines)
| Requirement | Technical Implementation | File Reference |
|-------------|--------------------------|----------------|
| Immutable Audit Trail | Double-entry ledger with counter-entry reversal logic. | `models/transaction.js` |
| Fraud Prevention (AML) | Automatic flagging of transactions > 10,000 MAD. | `middlewares/amlMiddleware.js` |
| Operational Controls | Maker-Checker workflow for high-value operations. | `models/PendingAction.js` |
| High Availability | Asynchronous webhook queueing with BullMQ. | `services/QueueService.js` |

## ☪️ Participative Finance (Sharia Compliance)
| Requirement | Technical Implementation | File Reference |
|-------------|--------------------------|----------------|
| Interest-Free Lending | Murabaha logic with fixed profit margins. | `utils/finance.js` |
| Late Penalty Usage | Redirection of overdue fees to 'Charity Contributions'. | `services/RepaymentService.js` |
| Contractual Validity | Damanesign integration for legal digital signatures. | `services/SignatureProvider.js` |

## 📊 Regulatory Reporting
| Requirement | Technical Implementation | File Reference |
|-------------|--------------------------|----------------|
| ANRF/UTRF Reporting | Automated high-value transaction exporter. | `services/ReportingService.js` |
| Financial Observability | Automated Trial Balance reconciliation engine. | `services/ReconService.js` |
