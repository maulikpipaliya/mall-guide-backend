const { Schema, model } = require("mongoose");

const mallOwnerSchema = new Schema({
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
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const mallOwnerModel = model("store-owners", mallOwnerSchema);

module.exports = mallOwnerModel;
