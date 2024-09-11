const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventname: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;
