const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true

    },
    description: {
      type: String,
      required: [true, "Description is required."]

    },
    deadline: {
      type: Date
    
    },
    startDate: 
      { type: Date, 
        default: Date.now }
    ,
    isDone: Boolean,
    user:
      [{
        type: Schema.Types.ObjectId,
        ref: "User"
      }]
    ,
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: "Task"
    }],
    


    // this second object adds extra properties: `createdAt` and `updatedAt`
    //timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;