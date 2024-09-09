const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const Project = require("../models/Project.model");
const Task = require("../models/Task.model");






/// POST /api/projects 

router.post("/projects", isAuthenticated, (req, res,next)=>{
    const {title, description,deadline, startDate, isDone } = req.body;
    const startDateValue = startDate ? new Date(startDate) : undefined;
   
    Project.create({title, description, startDate : startDateValue ,deadline, isDone, tasks:[]})
    .then((response)=>{ res.json(response)})
    .catch((err)=>{
        console.log("error while creating the project".err);
        res.status(500).json({message: "error while creating the project"});
    
    })

});


/// GET /api/projects

router.get("/projects", (req, res,next)=>{
    Project.find()
    .populate("tasks")
    .then((allProjects)=> res.json(allProjects))
    .catch((err)=>{
        console.log("Error while getting the project", err);
        res.status(500).json({message: "Error while getting the project"});
    })
});


/// GET /api/project/:projectId

router.get("/projects/:projectId", (req,res,next)=>{
    const { projectId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({message: "Specified id is not valid"});
        return;
    }
    
    Project.findById(projectId)
    .populate("tasks")
    .then((project)=> res.status(200).json(project))
    .catch((err)=>{
        console.log("Error while retrieving the project", err);
        res.status(500).json({message: " Error while retrieving the project"});
    });
});

/// PUT  /api/projects/:projectId

router.put("/projects/:projectId", isAuthenticated, (req,res, next)=>{
    const { projectId} = req.params;
    const { tasks, isDone } = req.body;

    console.log("Received projectId:", projectId);
    console.log("Received tasks array:", tasks); 

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({message: "Specified id is not valid"});
        return;
    }
    
    Project.findByIdAndUpdate(projectId, { tasks, isDone }, {new:true})
    .populate("tasks")
    .then((updatedProject)=>{
        console.log("Updated project with new tasks:", updatedProject);
        res.status(200).json(updatedProject)})
    .catch((err)=>{
        console.log("Error while updating the project", err);
        res.status(500).json({message: "Error while updating the project"})
    });
});

/// Delete /api/projects/:projectId

router.delete("/projects/:projectId", isAuthenticated, (req,res, next)=>{
    const { projectId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({message: "Specified id is not valid"});
        return;
    }

    Project.findByIdAndDelete(projectId)
    .then(()=>
        res.json({
            message: `project with ${projectId} is removed sucessfully.`,
        })
    )
    .catch((err)=>{
        console.log("Error while deleting the project", err);
        res.status(500).json({message: "Error while deleting the project"});
    })


})

module.exports = router;