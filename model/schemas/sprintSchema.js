const { Schema, model } = require("mongoose");

const sprintSchema = new Schema(
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

const Sprint = model("sprint", sprintSchema);

module.exports = Sprint;
