const { Schema, model } = require("mongoose");

const store2CategorySchema = new Schema({
  store_id: {
    type: Number,
    required: true,
  },
  category_id: {
    type: Number,
    required: true,
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

const store2CategoryModel = model("store2categories", store2CategorySchema);

module.exports = store2CategoryModel;
