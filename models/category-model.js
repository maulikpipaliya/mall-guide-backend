const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parent_category_id: {
    type: String,
    default: null,
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

const categoryModel = model("categories", categorySchema);

module.exports = categoryModel;
