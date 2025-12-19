import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  designation: { type: String, required: true }
});

const Client = mongoose.model("Client", ClientSchema);

export default Client;
