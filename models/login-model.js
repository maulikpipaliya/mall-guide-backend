const { Schema, model } = require("mongoose");

const loginSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  userrole: {
    type: Number,
  },
});

const loginModel = model("login", loginSchema);

module.exports = loginModel;
