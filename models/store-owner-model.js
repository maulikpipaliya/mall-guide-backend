const { Schema, model } = require("mongoose");

const storeOwnerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  contact: {
    type: Number,
    required: true,
  },
  address: {
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

const storeOwnerModel = model("store-owners", storeOwnerSchema);

module.exports = storeOwnerModel;
