const { Schema, model } = require("mongoose");

const storeSchema = new Schema({
  store_name: {
    type: String,
  },
  email: {
    type: String,
  },
  social_handle: {
    type: String,
  },
  location_id: {
    type: String,
  },
  route_name: {
    type: String,
  },
  url: {
    type: String,
    requrired: true,
  },
  url1: {
    type: String,
  },
  url2: {
    type: String,
  },
  url3: {
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

const storeModel = model("stores", storeSchema);

module.exports = storeModel;
