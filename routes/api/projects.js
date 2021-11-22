const express = require("express");
const router = express.Router();

const guard = require("../../service/guard");

const ProjectsController = require("../../controllers/projects");
const SprintsController = require("../../controllers/sprints");

// Работа с проектами

router.get("/", guard, ProjectsController.getAll);

router.get("/:projectId", guard, ProjectsController.getById);

router.post("/", guard, ProjectsController.create);

router.delete("/:projectId", guard, ProjectsController.remove);

router.patch("/:projectId/name", guard, ProjectsController.edit);

router.post("/:projectId/owners", guard, ProjectsController.addOwner);

// Работа со спринтами

router.get("/:projectId/sprints/:sprintId", guard, SprintsController.getById);

router.post("/:projectId/sprints", guard, SprintsController.create);

router.patch(
  "/:projectId/sprints/:sprintId/name",
  guard,
  SprintsController.edit
);

router.delete(
  "/:projectId/sprints/:sprintId/",
  guard,
  SprintsController.remove
);

// Работа с задачами

router.get(
  "/:projectId/sprints/:sprintId/tasks",
  guard,
  SprintsController.findTasks
);

router.post(
  "/:projectId/sprints/:sprintId/tasks",
  guard,
  SprintsController.addTask
);

router.patch(
  "/:projectId/sprints/:sprintId/tasks/:taskId",
  guard,
  SprintsController.editTask
);

router.delete(
  "/:projectId/sprints/:sprintId/tasks/:taskId",
  guard,
  SprintsController.removeTask
);

// Добавление в проект по email

router.post(
  "/:projectId/owners/verify",
  guard,
  ProjectsController.sendProjectEmail
);

router.get("/verify/:projectId/:userId", ProjectsController.addOwnerByEmail);

module.exports = router;
