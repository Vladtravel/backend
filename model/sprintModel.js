const Sprint = require("../model/schemas/sprintSchema");
const Project = require("../model/schemas/projectSchema");

const findAll = async (option) => {
  return await Sprint.find(option);
};

const findById = async (projectId, sprintId, userId) => {
  const check = await Project.findOne({ _id: projectId, owners: userId });

  if (!check.owners.includes(userId)) {
    return false;
  }

  return await Sprint.findById(sprintId);
};

const create = async (body, userId, projectId) => {
  const check = await Project.findOne({ _id: projectId, owners: userId });

  if (!check.owners.includes(userId)) {
    return false;
  }

  const sprint = new Sprint(body);

  return await sprint.save();
};

const edit = async (body, projectId, sprintId, userId) => {
  const check = await Project.findOne({ _id: projectId, owners: userId });

  if (!check.owners.includes(userId)) {
    return false;
  }

  console.log(check);

  const result = await Sprint.findOneAndUpdate(
    { _id: sprintId, project: projectId },
    { ...body },
    { new: true }
  );

  console.log(result);

  return result;
};

const remove = async (projectId, sprintId, userId) => {
  try {
    const check = await Project.findOne({ _id: projectId, owners: userId });

    if (!check.owners.includes(userId)) {
      return false;
    }

    const result = await Sprint.findOneAndRemove({
      _id: sprintId,
      project: projectId,
    });

    return result;
  } catch (error) {
    return console.error(error);
  }
};

// Работа с тасками

// req.body, req.params.projectId, req.params.sprintId, req.user._id;

const addTask = async (body, projectId, sprintId, userId) => {
  const check = await Project.findOne({ _id: projectId, owners: userId });

  if (!check.owners.includes(userId)) {
    return false;
  }

  const result = await Sprint.findOneAndUpdate(
    { _id: sprintId, project: projectId },
    { $push: { tasks: body } },
    { new: true }
  );

  console.log(result);

  return result;
};

const removeTask = async (projectId, sprintId, taskId, userId) => {
  const check = await Project.findOne({ _id: projectId, owners: userId });

  if (!check.owners.includes(userId)) {
    return false;
  }

  console.log("-------------------");
  console.log(check);

  const result = await Sprint.findOneAndUpdate(
    { _id: sprintId, project: projectId },
    { $pull: { tasks: { _id: taskId } } },
    { new: true }
  );

  console.log(result);

  return result;
};

module.exports = {
  findAll,
  findById,
  create,
  edit,
  remove,
  addTask,
  removeTask,
};
