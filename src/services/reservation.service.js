const reservationRepo = require('../repositories/reservation.repository');
const courtRepo = require('../repositories/court.repository');

exports.createReservation = async ({ court, user, startTime, endTime }) => {
  // ensure court exists
  const c = await courtRepo.findById(court);
  if (!c) throw Object.assign(new Error('Court not found'), { status: 404 });

  if (new Date(startTime) >= new Date(endTime)) {
    throw Object.assign(new Error('Invalid time range'), { status: 400 });
  }

  // check overlapping bookings
  const overlap = await reservationRepo.findOverlapping(court, new Date(startTime), new Date(endTime));
  if (overlap) throw Object.assign(new Error('Time slot already booked'), { status: 409 });

  // create reservation
  return reservationRepo.create({ courtId: court, userId: user, startTime, endTime });
};

exports.getAll = async (filter = {}) => {
  return reservationRepo.findAll(filter);
};

exports.getById = async (id) => {
  return reservationRepo.findById(id);
};

exports.updateReservation = async (id, data) => {
  // For simplicity, do not allow changing court in update here
  if (data.startTime && data.endTime && new Date(data.startTime) >= new Date(data.endTime)) {
    throw Object.assign(new Error('Invalid time range'), { status: 400 });
  }
  return reservationRepo.update(id, data);
};

exports.deleteReservation = async (id) => {
  return reservationRepo.delete(id);
};
