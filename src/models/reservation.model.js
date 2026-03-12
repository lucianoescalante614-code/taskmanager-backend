const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Court = require('./court.model');
const User = require('./user.model');

const Reservation = sequelize.define('Reservation', {
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.ENUM('booked', 'cancelled', 'completed'), defaultValue: 'booked' }
});

Reservation.belongsTo(Court, { foreignKey: 'courtId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });
Court.hasMany(Reservation, { foreignKey: 'courtId' });
User.hasMany(Reservation, { foreignKey: 'userId' });

module.exports = Reservation;
