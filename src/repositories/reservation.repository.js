const Reservation = require('../models/reservation.model');

exports.create = async (data) => {
  return Reservation.create(data);
};

exports.findAll = async (filter = {}) => {
  // filter may contain { court: id, user: id, status: ... }
  return Reservation.find(filter).populate('court user').sort({ startTime: -1 });
};

exports.findById = async (id) => {
  return Reservation.findById(id).populate('court user');
};

exports.findOverlapping = async (courtId, startTime, endTime) => {
  // overlap condition: existing.startTime < new.endTime && existing.endTime > new.startTime
  return Reservation.findOne({
    court: courtId,
    status: 'booked',
    startTime: { $lt: endTime },
    endTime: { $gt: startTime }
  });
};

exports.update = async (id, data) => {
  return Reservation.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return Reservation.findByIdAndDelete(id);
};
