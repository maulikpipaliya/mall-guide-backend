const { Schema, model } = require("mongoose");

const rateSchema = new Schema({
  store_id: {
    type: String,
  },
  category_id: {
    type: String,
  },
  rating: {
    type: Number,
  },
  // is_deleted: {
  //   type: Boolean,
  //   default: false,
  // },
  created_at: {
    type: Date,
    default: new Date(),
  },
  // updated_at: {
  //   type: Date,
  //   default: null,
  // },
});

const rateModel = model("ratings", rateSchema);

module.exports = rateModel;
