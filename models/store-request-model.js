const { Schema, model } = require("mongoose");

const storeRequestSchema = new Schema({
  store_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  social_handle: {
    type: String,
  },
  route_name: {
    type: String,
    required: true,
  },
  location_id: {
    type: String,
    default: null,
  },
  is_approved: {
    type: Boolean,
    default: false,
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

const storereuestModel = model("store_requests", storeRequestSchema);

module.exports = storereuestModel;
