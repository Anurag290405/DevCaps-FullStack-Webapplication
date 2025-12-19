import SuccessStories from "../models/SuccessStoriesPage/addSuccessStories.model.js";

export const getSuccessStories = async (_req, res) => {
  try {
    const stories = await SuccessStories.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: stories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const replaceSuccessStories = async (req, res) => {
  try {
    const { stories } = req.body;
    if (!Array.isArray(stories)) {
      return res.status(400).json({ success: false, message: "stories must be an array" });
    }

    await SuccessStories.deleteMany({});
    const cleaned = stories.map(({ _id, ...rest }) => rest);
    const inserted = await SuccessStories.insertMany(cleaned);
    return res.status(200).json({ success: true, data: inserted });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
