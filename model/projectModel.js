const Project = require("../model/schemas/projectSchema");

const findAll = async (option) => {
  return await Project.find(option);
};

const findById = async (id) => {
  return await Project.findById(id);
};

const create = async (options) => {
  const project = new Project(options);

  return await project.save();
};

const remove = async (id) => {
  try {
    const result = await Project.findOneAndRemove({
      _id: id,
    });

    return result;
  } catch (error) {
    return console.error(error);
  }
};

module.exports = {
  findAll,
  findById,
  create,
  remove,
};
