const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");



// TODO: Please make sure you edit the User model to whatever makes sense in this case
const TaskSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required."]

    },
    deadline: {
      type: Date

    },
    isDone: {
      type: Boolean,
      required: true
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  },
  // {
  //   // this second object adds extra properties: `createdAt` and `updatedAt`
  //   timestamps: true,
  // }
);

const Task = model("Task", TaskSchema);

module.exports = Task;