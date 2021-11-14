const ProjectModel = require("../model/projectModel");

const getAll = async (req, res, next) => {
  try {
    const result = await ProjectModel.findAll();

    return res.json({ status: "success", code: 200, data: [...result] });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await ProjectModel.findById(req.params.id);

    if (result) {
      return res.json({ status: "success", code: 200, data: { result } });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newProject = await ProjectModel.create({ ...req.body });

    return res
      .status(201)
      .json({ status: "success", code: 201, data: { newProject } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const isCompleted = await ProjectModel.remove(req.params.id);

    if (isCompleted) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
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
  create,
  remove,
};
