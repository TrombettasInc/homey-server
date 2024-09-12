const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

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
    startDate: {
      type: Date, 
      default: Date.now
    },
    isDone: {
      type: Boolean,
      default: false
    },
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: "Task"
    }]
  },
  { timestamps: true }  // This line enables timestamps
);

const Project = model("Project", projectSchema);

module.exports = Project;
