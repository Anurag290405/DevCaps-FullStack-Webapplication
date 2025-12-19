import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true }
});

const Subscriber = mongoose.model("Subscriber", SubscriberSchema);

export default Subscriber;
