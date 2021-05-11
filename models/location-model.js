const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  floor_number: {
    type: Number,
  },
  block_name: {
    type: String,
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
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const locationModel = model("locations", locationSchema);

module.exports = locationModel;
