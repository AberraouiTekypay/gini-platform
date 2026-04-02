/**
 * Secrets Manager Utility
 * Simulates fetching keys from AWS Secrets Manager or HashiCorp Vault.
 */
class SecretsManager {
  constructor() {
    this.cache = new Map();
  }

  async getSecret(secretName) {
    if (this.cache.has(secretName)) {
      return this.cache.get(secretName);
    }

    // In production, this would make an API call to AWS/Vault.
    // For now, we fallback to process.env
    const secretValue = process.env[secretName];
    
    if (secretValue) {
      this.cache.set(secretName, secretValue);
    }

    return secretValue;
  }
}

module.exports = new SecretsManager();
