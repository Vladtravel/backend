const ProjectModel = require("../model/projectModel");
const SprintModel = require("../model/sprintModel");
const UserModel = require("../model/userModel");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await ProjectModel.findAll({ owners: userId });

    return res.json({ status: "success", code: 200, data: [...result] });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await ProjectModel.findById({
      _id: req.params.projectId,
      owners: userId,
    });

    const sprints = await SprintModel.findAll({
      project: req.params.id,
    });

    if (result) {
      return res.json({
        status: "success",
        code: 200,
        data: { ...result._doc, sprints },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const newProject = await ProjectModel.create({
      ...req.body,
      owners: userId,
    });

    return res
      .status(201)
      .json({ status: "success", code: 201, data: { newProject } });
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const updatedProject = await ProjectModel.edit(
      req.params.projectId,
      req.body,
      userId
    );

    if (updatedProject) {
      return res.json({
        status: "success",
        code: 200,
        data: { updatedProject },
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

const addOwner = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const newOwner = await UserModel.findByEmail(req.body.email);

    const newOwnerId = newOwner._id;

    const updatedProject = await ProjectModel.addOwner(
      req.params.projectId,
      userId,
      newOwnerId
    );

    if (updatedProject) {
      return res.json({
        status: "success",
        code: 200,
        data: { updatedProject },
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const isCompleted = await ProjectModel.remove(req.params.projectId, userId);

    if (isCompleted) {
      return res.json({
        status: "success",
        code: 200,
        message: "project deleted",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  edit,
  create,
  addOwner,
  remove,
};
