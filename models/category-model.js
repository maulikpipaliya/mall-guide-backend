const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
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
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const categoryModel = model("categories", categorySchema);

module.exports = categoryModel;
