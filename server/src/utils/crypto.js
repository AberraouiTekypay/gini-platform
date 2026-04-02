const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = process.env.PII_ENCRYPTION_KEY; // Must be 32 bytes from environment

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error('PII_ENCRYPTION_KEY must be a 32-character string set in environment variables.');
}
const IV_LENGTH = 16;

/**
 * Encrypts a string (e.g., PII like National ID, Phone).
 * @param {string} text - The plain text to encrypt.
 * @returns {string} The encrypted hex string (iv:content).
 */
const encryptPII = (text) => {
  if (!text) return text;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

/**
 * Decrypts an encrypted hex string.
 * @param {string} text - The encrypted hex string (iv:content).
 * @returns {string} The decrypted plain text.
 */
const decryptPII = (text) => {
  if (!text || !text.includes(':')) return text;
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = { encryptPII, decryptPII };
