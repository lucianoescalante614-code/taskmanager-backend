const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Court = sequelize.define('Court', {
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  sport: { type: DataTypes.STRING },
  pricePerHour: { type: DataTypes.FLOAT, defaultValue: 0 }
});

module.exports = Court;
