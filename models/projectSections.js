import { Schema, model, models } from "mongoose";

const projectSectionsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  inputs: [
    {
      type: {
        type: String,
        required: [true, "Input type is required."],
      },
      value: {
        type: String,
        required: [true, "Input value is required."],
      },
    },
  ],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProjectSections = models.ProjectSections || model("ProjectSections", projectSectionsSchema);

export default ProjectSections;
