const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 bytes from environment

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error('ENCRYPTION_KEY must be a 32-character string set in environment variables.');
}
const IV_LENGTH = 16;

/**
 * Encrypts a file and saves it.
 * @param {string} filePath - Path to the file to encrypt.
 */
const encryptFile = (filePath) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  const input = fs.readFileSync(filePath);
  const encrypted = Buffer.concat([iv, cipher.update(input), cipher.final()]);
  fs.writeFileSync(filePath, encrypted);
  console.log(`[Security] File encrypted at rest: ${filePath}`);
};

/**
 * Decrypts an encrypted file and returns the buffer.
 * @param {string} filePath - Path to the encrypted file.
 * @returns {Buffer} The decrypted file content.
 */
const decryptFile = (filePath) => {
  const encrypted = fs.readFileSync(filePath);
  const iv = encrypted.slice(0, IV_LENGTH);
  const encryptedContent = encrypted.slice(IV_LENGTH);
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);
  return decrypted;
};

module.exports = { encryptFile, decryptFile };
