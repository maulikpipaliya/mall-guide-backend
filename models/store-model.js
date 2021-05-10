const { Schema, model } = require("mongoose");

const storeSchema = new Schema({
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
  location_id: {
    type: String,
    required: true,
  },
  route_name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    requrired: true,
  },
  url1: {
    type: String,
    requrired: true,
  },
  url2: {
    type: String,
    requrired: true,
  },
  url3: {
    type: String,
    requrired: true,
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

const storeModel = model("stores", storeSchema);

module.exports = storeModel;
