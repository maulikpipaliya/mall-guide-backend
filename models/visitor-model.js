const { Schema, model } = require("mongoose");

const visitorSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  contact: {
    type: Number,
  },
  email: {
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

const visitorModel = model("visitors", visitorSchema);

module.exports = visitorModel;
