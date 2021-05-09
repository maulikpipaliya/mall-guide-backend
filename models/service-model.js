const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  service_name: {
    type: String,
    required: true,
  },
  location_id: {
    type: String,
    required: true,
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

const servicesModel = model("services", serviceSchema);

module.exports = servicesModel;
