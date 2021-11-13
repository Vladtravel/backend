const Sprint = require("../model/schemas/sprintSchema");

const findById = async (id) => {
  return await Sprint.findById(id);
};

const create = async (options) => {
  const sprint = new Sprint(options);

  return await sprint.save();
};

module.exports = {
  findById,
  create,
};
