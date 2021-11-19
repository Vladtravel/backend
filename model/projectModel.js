const Project = require("../model/schemas/projectSchema");

const findAll = async (option) => {
  return await Project.find(option);
};

const findById = async (options) => {
  return await Project.findOne(options);
};

const create = async (options) => {
  const project = new Project(options);

  return await project.save();
};

const edit = async (projectId, body, userId) => {
  const result = await Project.findOneAndUpdate(
    { _id: projectId, owners: userId },
    { ...body },
    { new: true }
  );

  return result;
};

const addOwner = async (projectId, userId, newOwnerId) => {
  const check = await Project.findOne({ _id: projectId, owners: userId });

  if (check.owners.includes(newOwnerId)) {
    return false;
  }

  const result = await Project.findOneAndUpdate(
    { _id: projectId, owners: userId },
    { $push: { owners: newOwnerId } },
    { new: true }
  );

  return result;
};

const remove = async (id, userId) => {
  try {
    const result = await Project.findOneAndRemove({
      _id: id,
      owner: userId,
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
  edit,
  addOwner,
  remove,
};
