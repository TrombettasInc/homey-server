
const mongoose = require('mongoose');
const Project = require("../models/Project.model")
const Task = require("../models/Task.model")

// Middleware to check if the user is the owner of the project
const isProjectOwner = async (req, res, next) => {
  const { projectId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Specified project ID is not valid" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the user in req.payload._id is the owner (project.user)
    if (!project.user.equals(req.payload._id)) {
      return res.status(403).json({ message: "Unauthorized: You are not the owner of this project" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if the user is the owner of the task (by the project's owner)
const isTaskOwner = async (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Specified task ID is not valid" });
  }

  try {
    const task = await Task.findById(taskId).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = task.project;

    // Check if the user in req.payload._id is the owner of the project associated with the task
    if (!project.user.equals(req.payload._id)) {
      return res.status(403).json({ message: "Unauthorized: You are not the owner of the project related to this task" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isProjectOwner, isTaskOwner };
