// ownership.middleware.js

const mongoose = require('mongoose');
const Project = require('../models/Project.model');
const Task = require('../models/Task.model');

// Middleware to check if the user can view a project
const canViewProject = async (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the authenticated user is the owner of the project
    if (!project.user.equals(req.payload._id)) {
      return res.status(403).json({ message: "Unauthorized: You cannot view this project" });
    }

    req.project = project;  // Attach the project to the request object for further use
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if the user can view a task (via the project)
const canViewTask = async (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await Task.findById(taskId).populate('project');
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the authenticated user is the owner of the project related to the task
    const project = task.project;
    if (!project.user.equals(req.payload._id)) {
      return res.status(403).json({ message: "Unauthorized: You cannot view this task" });
    }

    req.task = task;  // Attach the task to the request object for further use
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if the user is the owner of the project for modification or deletion
const isProjectOwner = async (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the authenticated user is the owner of the project
    if (!project.user.equals(req.payload._id)) {
      return res.status(403).json({ message: "Unauthorized: You cannot modify this project" });
    }

    req.project = project;  // Attach the project to the request object for further use
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if the user is the owner of the task for modification or deletion
const isTaskOwner = async (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await Task.findById(taskId).populate('project');
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = task.project;

    // Check if the authenticated user is the owner of the project related to the task
    if (!project.user.equals(req.payload._id)) {
      return res.status(403).json({ message: "Unauthorized: You cannot modify or delete this task" });
    }

    req.task = task;  // Attach the task to the request object for further use
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { canViewProject, canViewTask, isProjectOwner, isTaskOwner };
