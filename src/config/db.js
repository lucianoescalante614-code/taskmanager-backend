const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../courtbooker.db'),
  logging: false
});

async function connectDB() {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('SQLite connected');
}

module.exports = { sequelize, connectDB };
