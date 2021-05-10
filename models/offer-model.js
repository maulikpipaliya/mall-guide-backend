const { Schema, model } = require("mongoose");

const offerSchema = new Schema({
  offer_name: {
    type: String,
    required: true,
  },
  offer_by: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
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

const offerModel = model("offers", offerSchema);

module.exports = offerModel;
