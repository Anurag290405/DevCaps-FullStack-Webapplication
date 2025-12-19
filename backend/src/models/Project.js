import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
