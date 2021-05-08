var express = require("express");
var router = express.Router();

//data from database
var visitorModel = require("../models/visitor-model");

function validatePassword(visitor, login, res) {
  if (visitor[0].password == login.password) {
    res.status(200).json({ message: "Login Successfull" });
  } else {
    throw new Error("[ERROR] : Wrong Password");
  }
}

router.post("/", async (req, res) => {
  const login = req.body;
  try {
    if (login.userrole == 0) {
      let visitor = await visitorModel.find({ username: login.username });
      // console.log("UserName - " + visitor);
      if (visitor.length == 0) {
        visitor = await visitorModel.find({ email: login.username });
        // console.log("Email - " + visitor);
        if (visitor.length == 0) {
          if (!isNaN(login.username))
            visitor = await visitorModel.find({
              contact: parseInt(login.username),
            });
          // console.log("Contact - " + visitor);
          if (visitor.length == 0) {
            throw new Error("[ERROR] : User Not found");
          } else {
            validatePassword(visitor, login, res);
          }
        } else {
          validatePassword(visitor, login, res);
        }
      } else {
        validatePassword(visitor, login, res);
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
