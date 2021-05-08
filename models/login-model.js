const { Schema, model } = require("mongoose");

const loginSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userrole:{
    type:Number,
    required:true
  },
  
});

const loginModel = model("login", loginSchema);

module.exports = loginModel;
