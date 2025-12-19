import Subscriber from "../models/Subscriber.js";

export const createSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.create(req.body);
    return res.status(201).json({ success: true, data: subscriber });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getSubscribers = async (_req, res) => {
  try {
    const subscribers = await Subscriber.find({});
    return res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
