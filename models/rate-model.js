const { Schema, model } = require("mongoose");

const rateSchema = new Schema({
  store_id: {
    type: String,
    required: true,
  },
  category_id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  // is_deleted: {
  //   type: Boolean,
  //   default: false,
  // },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  // updated_at: {
  //   type: Date,
  //   default: null,
  // },
});

const rateModel = model("ratings", rateSchema);

module.exports = rateModel;
