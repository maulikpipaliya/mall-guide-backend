const { Schema, model } = require("mongoose");

const visitSchema = new Schema({
  visitor_id: {
    type: String,
  },
  visit_datetime: {
    type: Date,
    default: new Date(),
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  // updated_at: {
  //   type: Date,
  //   default: null,
  // },
});

const visitsModel = model("visits", visitSchema);

module.exports = visitsModel;
