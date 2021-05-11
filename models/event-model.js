const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  event_name: {
    type: String,
  },
  event_desc: {
    type: String,
  },
  organizer: {
    type: String,
  },
  event_location: {
    type: String,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  url: {
    type: String,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const eventModel = model("events", eventSchema);

module.exports = eventModel;
