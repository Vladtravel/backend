const { Schema, model, SchemaTypes } = require("mongoose");

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for project"],
    },
    description: {
      type: String,
      required: [true, "Set description for project"],
    },
    owners: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Project = model("project", projectSchema);

module.exports = Project;
