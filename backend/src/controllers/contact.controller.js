import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    return res.status(201).json({ success: true, data: contact });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getContacts = async (_req, res) => {
  try {
    const contacts = await Contact.find({});
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
