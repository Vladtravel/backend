const SprintsModel = require("../model/sprintModel");

const getById = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const data = await SprintsModel.findById(
      req.params.projectId,
      req.params.sprintId,
      userId
    );

    if (data) {
      return res.json({
        status: "success",
        code: 200,
        data,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const data = await SprintsModel.create(
      {
        ...req.body,
        project: req.params.projectId,
      },
      userId,
      req.params.projectId
    );

    if (data) {
      return res.status(201).json({ status: "success", code: 201, data });
    }
  } catch (error) {
    next(error);
  }
};

//body, projectId, sprintId, userId

const edit = async (req, res, next) => {
  try {
    const data = await SprintsModel.edit(
      req.body,
      req.params.projectId,
      req.params.sprintId,
      req.user._id
    );

    console.log(data);

    if (data) {
      return res.json({
        status: "success",
        code: 200,
        data,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

//projectId, sprintId, userId

const remove = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await SprintsModel.remove(
      req.params.projectId,
      req.params.sprintId,
      userId
    );

    if (result) {
      return res.json({
        status: "success",
        code: 200,
        message: "sprint deleted",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

//Работа с задачами

const findTasks = async (req, res, next) => {
  try {
    const data = await SprintsModel.findTasks(
      req.body,
      req.params.projectId,
      req.params.sprintId,
      req.user._id
    );

    console.log(data);

    if (data) {
      return res.json({
        status: "success",
        code: 201,
        data,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

const addTask = async (req, res, next) => {
  try {
    const data = await SprintsModel.addTask(
      req.body,
      req.params.projectId,
      req.params.sprintId,
      req.user._id
    );
    console.log(data);
    if (data) {
      return res.json({
        status: "success",
        code: 201,
        data,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const data = await SprintsModel.removeTask(
      req.params.projectId,
      req.params.sprintId,
      req.params.taskId,
      req.user._id
    );

    if (data) {
      return res.json({
        status: "success",
        code: 200,
        data,
      });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getById,
  create,
  edit,
  remove,
  findTasks,
  addTask,
  removeTask,
};
