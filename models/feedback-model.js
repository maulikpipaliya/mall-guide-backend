const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  text: {
    type: String,
  },
  givenby: {
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
  // updated_at: {
  //   type: Date,
  //   default: null,
  // },
});

const feedbackModel = model("feedbacks", feedbackSchema);

module.exports = feedbackModel;
