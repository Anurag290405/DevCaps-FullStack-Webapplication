import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true, // fixed spelling
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const SuccessStories = mongoose.model("SuccessStories", successStorySchema);
export default SuccessStories;
