const express = require("express");
const router = express.Router();

const guard = require("../../service/guard");

const ProjectsController = require("../../controllers/projects");

router.get("/", guard, ProjectsController.getAll);

router.get("/:id", guard, ProjectsController.getById);

router.post("/", guard, ProjectsController.create);

router.delete("/:id", guard, ProjectsController.remove);

router.patch("/:id/name", guard, ProjectsController.edit);

router.post("/:id/owners", guard, ProjectsController.addOwner);

module.exports = router;
