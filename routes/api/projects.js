const express = require("express");
const router = express.Router();

const ProjectsController = require("../../controllers/projects");

router.get("/", ProjectsController.getAll);

router.get("/:id", ProjectsController.getById);

router.post("/", ProjectsController.create);

router.delete("/:id", ProjectsController.remove);

module.exports = router;
