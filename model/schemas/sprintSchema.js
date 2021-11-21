const { Schema, model, SchemaTypes } = require("mongoose");

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for task"],
    },
    sheduledHours: {
      type: Number,
      required: [true, "Set sheduled hours for task"],
    },
  },
  { versionKey: false, timestamps: true }
);

const sprintSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for project"],
    },
    endDate: {
      type: Date,
    },
    duration: {
      type: Number,
    },
    project: {
      type: SchemaTypes.ObjectId,
      ref: "project",
    },
    tasks: [taskSchema],
  },
  { versionKey: false, timestamps: true }
);

const Sprint = model("sprint", sprintSchema);

module.exports = Sprint;
