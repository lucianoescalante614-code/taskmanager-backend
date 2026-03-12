const Court = require('../models/court.model');

exports.create = async (data) => {
  return Court.create(data);
};

exports.findAll = async (filter = {}) => {
  return Court.findAll({ where: filter, order: [['createdAt', 'DESC']] });
};

exports.findById = async (id) => {
  return Court.findByPk(id);
};

exports.update = async (id, data) => {
  await Court.update(data, { where: { id } });
  return Court.findByPk(id);
};

exports.delete = async (id) => {
  return Court.destroy({ where: { id } });
};
