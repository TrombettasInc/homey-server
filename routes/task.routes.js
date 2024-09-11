const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require('../middleware/jwt.middleware');
const { isProjectOwner, isTaskOwner } = require("../middleware/ownership.middleware");

const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

//  POST /api/tasks  -  Creates a new task

router.post("/tasks", isAuthenticated, (req, res, next) => {
    const { description, deadline, isDone, projectId } = req.body;

    Task.create({ description, deadline, isDone, project: projectId })
        .then((newTask) => {
            return Project.findByIdAndUpdate(projectId, 
                { $push: { tasks: newTask._id } },
                { new: true });
        })
        .then((response) => res.json(response))
        .catch((err) => {
            console.log("Error while creating the task", err);
            res.status(500).json({ message: "Error while creating the task" })
        })
});


// PUT /api/tasks/:taskId

router.put("/tasks/:taskId", isAuthenticated, isTaskOwner, (req,res)=>{
    const { taskId } = req.params;
    const { isDone } = req.body;


    Task.findByIdAndUpdate(taskId, { isDone }, { new:true })
    .then((updatedTask)=>{
        res.json(updatedTask)
    })
    .catch((err)=>{
        console.log("Error while updating the project", err);
        res.status(500).json({message: "Error while updating the project"})
    });
})

// DELETE /api/tasks - Delete a task
router.delete("/tasks/:taskId", isAuthenticated,isTaskOwner, (req, res, next) => {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }


    Task.findByIdAndDelete(taskId)
        .then((deletedTask) => {
            
            if (deletedTask) {
                // Remove task reference from all projects that contain this task
                return Project.updateMany(
                    { tasks: taskId },
                    { $pull: { tasks: taskId } }
                );
            } else {
                throw new Error("Task not found");
            }
        })
        .then(() => {
            res.json({ message: `Task with ${taskId} is removed successfully.` });
        })
        .catch((err) => {
            console.log("Error while deleting the task", err);
            res.status(500).json({ message: "Error while deleting the task" });
        });


})

module.exports = router;