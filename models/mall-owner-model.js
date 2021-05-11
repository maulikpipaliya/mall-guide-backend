const { Schema, model } = require("mongoose");

const mallOwnerSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: Number,
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

const mallOwnerModel = model("mall-owners", mallOwnerSchema);

module.exports = mallOwnerModel;
