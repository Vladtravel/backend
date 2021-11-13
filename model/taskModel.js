const Task = require("../model/schemas/taskSchema");

const findById = async (id) => {
  return await Task.findById(id);
};

const create = async (options) => {
  const task = new Task(options);

  return await task.save();
};

module.exports = {
  findById,
  create,
};
