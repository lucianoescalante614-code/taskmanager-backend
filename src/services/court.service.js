const courtRepo = require('../repositories/court.repository');

exports.createCourt = async (data) => {
  return courtRepo.create(data);
};

exports.getAll = async () => {
  return courtRepo.findAll();
};

exports.getById = async (id) => {
  return courtRepo.findById(id);
};

exports.updateCourt = async (id, data) => {
  return courtRepo.update(id, data);
};

exports.deleteCourt = async (id) => {
  return courtRepo.delete(id);
};
