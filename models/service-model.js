const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  service_name: {
    type: String,
  },
  location_id: {
    type: String,
  },
  description: {
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

const servicesModel = model("services", serviceSchema);

module.exports = servicesModel;
