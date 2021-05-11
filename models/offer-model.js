const { Schema, model } = require("mongoose");

const offerSchema = new Schema({
  offer_name: {
    type: String,
  },
  offer_by: {
    type: String,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  url: {
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

const offerModel = model("offers", offerSchema);

module.exports = offerModel;
