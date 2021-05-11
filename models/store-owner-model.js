const { Schema, model } = require("mongoose");

const storeOwnerSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: Number,
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
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const storeOwnerModel = model("store-owners", storeOwnerSchema);

module.exports = storeOwnerModel;
