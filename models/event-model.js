const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  event_name: {
    type: String,
    required: true,
  },
  event_desc: {
    type: String,
  },
  organizer: {
    type: String,
    required: true,
  },
  event_location: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
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
