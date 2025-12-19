import Client from "../models/Client.js";

export const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    return res.status(201).json({ success: true, data: client });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getClients = async (_req, res) => {
  try {
    const clients = await Client.find({});
    return res.status(200).json({ success: true, data: clients });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
