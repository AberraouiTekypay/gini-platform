// src/models/index.js

require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance using the DATABASE_URL from your .env file
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Set to true if you want to see SQL queries in the console
});

// Export the sequelize instance for use in other files
module.exports = { sequelize };
