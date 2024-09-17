const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { canViewProject, isProjectOwner } = require("../middleware/ownership.middleware");
const Project = require("../models/Project.model");

// POST /api/projects - Create a new project
router.post("/projects", isAuthenticated, (req, res, next) => {
  const { title, description, deadline, startDate, isDone } = req.body;
  const startDateValue = startDate ? new Date(startDate) : undefined;

  Project.create({
    title, description, startDate: startDateValue, deadline, isDone, tasks: [], user: req.payload._id
  })
    .then(response => res.json(response))
    .catch(err => {
      console.log("Error while creating the project", err);
      res.status(500).json({ message: "Error while creating the project" });
    });
});

// GET /api/projects - Get all projects of the authenticated user
router.get("/projects", isAuthenticated, (req, res, next) => {
  Project.find({ user: req.payload._id })
    .populate("tasks")
    .then(allProjects => res.json(allProjects))
    .catch(err => {
      console.log("Error while getting the projects", err);
      res.status(500).json({ message: "Error while getting the projects" });
    });
});

// GET /api/projects/:projectId - Get a specific project (only if the user owns it)
router.get("/projects/:projectId", isAuthenticated, canViewProject, (req, res, next) => {
  res.status(200).json(req.project);
});

// PUT /api/projects/:projectId - Update a specific project (only if the user owns it)
router.put("/projects/:projectId", isAuthenticated, isProjectOwner, (req, res, next) => {
  const { projectId } = req.params;
  const { title, description, deadline, tasks, isDone } = req.body;

  Project.findByIdAndUpdate(
    projectId,
    { title, description, deadline, tasks, isDone },
    { new: true }
  )
    .populate("tasks")
    .then(updatedProject => res.json(updatedProject))
    .catch(err => res.status(500).json({ message: "Error while updating the project", err }));
});

// DELETE /api/projects/:projectId - Delete a project (only if the user owns it)
router.delete("/projects/:projectId", isAuthenticated, isProjectOwner, (req, res, next) => {
  const { projectId } = req.params;

  Project.findByIdAndDelete(projectId)
    .then(() => res.json({ message: `Project with ID ${projectId} was deleted successfully.` }))
    .catch(err => res.status(500).json({ message: "Error while deleting the project", err }));
});

module.exports = router;
