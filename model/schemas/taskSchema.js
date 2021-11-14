const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for project"],
    },
    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model("task", taskSchema);

module.exports = Task;
