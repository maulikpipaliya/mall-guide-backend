const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  givenby: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  // updated_at: {
  //   type: Date,
  //   default: null,
  // },
});

const feedbackModel = model("feedbacks", feedbackSchema);

module.exports = feedbackModel;
