require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Load defaults if they exist
const defaultsPath = path.join(__dirname, '../../.env.defaults');
let defaults = {};
if (fs.existsSync(defaultsPath)) {
  const content = fs.readFileSync(defaultsPath, 'utf8');
  content.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) defaults[key.trim()] = value.trim();
  });
}

const getSecret = (key) => {
  return process.env[key] || defaults[key];
};

const isMockMode = (provider) => {
  const key = getSecret(`${provider.toUpperCase()}_API_KEY`);
  return !key || key.startsWith('MOCK_');
};

module.exports = { getSecret, isMockMode };
