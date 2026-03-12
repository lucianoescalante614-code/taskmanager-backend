const courtService = require('../services/court.service');

exports.create = async (req, res, next) => {
  try {
    // only admin can create courts
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const court = await courtService.createCourt(req.body);
    res.status(201).json(court);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const list = await courtService.getAll();
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const court = await courtService.getById(req.params.id);
    if (!court) return res.status(404).json({ message: 'Not found' });
    res.json(court);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const updated = await courtService.updateCourt(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await courtService.deleteCourt(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
