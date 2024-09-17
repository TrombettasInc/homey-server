const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { canViewTask, isTaskOwner } = require("../middleware/ownership.middleware");
const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

// POST /api/tasks - Create a new task
router.post("/tasks", isAuthenticated, (req, res, next) => {
  const { description, deadline, isDone, projectId } = req.body;

  Task.create({
    description, deadline, isDone, project: projectId
  })
    .then(newTask => {
      return Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } }, { new: true });
    })
    .then(response => res.json(response))
    .catch(err => {
      console.log("Error while creating the task", err);
      res.status(500).json({ message: "Error while creating the task" });
    });
});

// GET /api/tasks/:taskId - Get a specific task (only if the user owns it through the project)
router.get("/tasks/:taskId", isAuthenticated, canViewTask, (req, res, next) => {
  res.status(200).json(req.task);
});

// PUT /api/tasks/:taskId - Update a task (only if the user owns the project containing the task)
router.put("/tasks/:taskId", isAuthenticated, isTaskOwner, (req, res, next) => {
  const { taskId } = req.params;
  const { isDone } = req.body;

  Task.findByIdAndUpdate(taskId, { isDone }, { new: true })
    .then(updatedTask => res.json(updatedTask))
    .catch(err => res.status(500).json({ message: "Error while updating the task", err }));
});

// DELETE /api/tasks/:taskId - Delete a task (only if the user owns the project containing the task)
router.delete("/tasks/:taskId", isAuthenticated, isTaskOwner, (req, res, next) => {
  const { taskId } = req.params;

  Task.findByIdAndDelete(taskId)
    .then(() => res.json({ message: `Task with ID ${taskId} was deleted successfully.` }))
    .catch(err => res.status(500).json({ message: "Error while deleting the task", err }));
});

module.exports = router;
