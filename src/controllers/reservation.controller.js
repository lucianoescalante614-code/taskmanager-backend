const reservationService = require('../services/reservation.service');

exports.create = async (req, res, next) => {
  try {
    const payload = {
      court: req.body.court,
      user: req.user._id,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    };
    const reservation = await reservationService.createReservation(payload);
    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.mine === 'true' && req.user) filter.user = req.user._id;
    if (req.query.courtId) filter.court = req.query.courtId;
    // admins can view all; others restricted by mine flag
    const list = await reservationService.getAll(filter);
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const r = await reservationService.getById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Not found' });
    res.json(r);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    // allow only owner or admin
    const existing = await reservationService.getById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Not found' });
    if (existing.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const updated = await reservationService.updateReservation(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const existing = await reservationService.getById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Not found' });
    if (existing.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await reservationService.deleteReservation(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
