const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  floor_number: {
    type: Number,
    required: true,
  },
  block_number: {
    type: String,
    required: true,
  },
  location_desc: {
    type: String,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const locationModel = model("locations", locationSchema);

module.exports = locationModel;
