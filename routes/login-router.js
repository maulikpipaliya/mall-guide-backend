var express = require("express");
var router = express.Router();

//data from database
var visitorModel = require("../models/visitor-model");
var storeOwnerModel = require("../models/store-owner-model");


function validatePassword(user, login, res) {
  if (user[0].password == login.password) {
    res.status(200).json({ message: "Login Successfull" });
  } else {
    throw new Error("[ERROR] : Wrong Password");
  }
}
const validateuser = async (model, login, res) => {
  let user = await model.find({ username: login.username });
  let flag = false;
  console.log("UserName - " + user);
  if (user.length == 0) {
    user = await model.find({
      email: login.username
    });
    console.log("Email - " + user);
    if (user.length == 0) {
      if (!isNaN(login.username))
        user = await model.find({
          contact: parseInt(login.username),
        });
      console.log("Contact - " + user);
      if (user.length == 0) {
        throw new Error("[ERROR] : User Not found");
      } else {
        flag = true;
      }
    } else {
      flag = true;
    }
  } else {
    flag = true;
  }
  if (flag)
    validatePassword(user, login, res);
}

router.post("/", async (req, res) => {
  const login = req.body;
  try {
    if (login.userrole == 2) {
      await validateuser(visitorModel, login, res);
    }
    else if (login.userrole == 1) {
      await validateuser(storeOwnerModel, login, res);
    }
    else if(login.userrole== 0)
    {
      
         if(login.username=="admin"&&login.password=="admin") {
          res.status(200).json({ message: "Login Successfull" });
        } else {
          throw new Error("[ERROR] : User Not Found");
        }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
