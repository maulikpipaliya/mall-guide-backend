var express = require("express");
var router = express.Router();

//data from database
var visitorModel = require("../models/visitor-model");
var storeOwnerModel = require("../models/store-owner-model");
var visitsModel = require("../models/visits-model");

var sessionChecker = (req, res, next) => {
  // console.log("keshav1111111 + " + req.session.userId);
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/registration");
  } else {
    next();
  }
};

function validatePassword(user, login) {
  if (user[0].password == login.password) {
    return true;
  } else {
    throw new Error("[ERROR] : Wrong Password");
  }
}
const validateuser = async (model, login) => {
  let user = await model.find({ username: login.username });
  let flag = false;
  // console.log("UserName - " + user);
  if (user.length == 0) {
    user = await model.find({
      email: login.username,
    });
    // console.log("Email - " + user);
    if (user.length == 0) {
      if (!isNaN(login.username))
        user = await model.find({
          contact: parseInt(login.username),
        });
      // console.log("Contact - " + user);
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
  if (flag && validatePassword(user, login)) return user[0];
  else return null;
};

router.post("/", sessionChecker, async (req, res) => {
  const login = req.body;
  try {
    if (login.userrole == 2) {
      // visitor
      const userid = await validateuser(visitorModel, login);
      // console.log("User id = " + userid);
      if (userid) {
        req.session.user = userid;
        req.session.role = 2;
        const newVisit = new visitsModel({ visitor_id: userid._id });
        // console.log("[INFO] : Adding new new entry in visits collection");
        const inserted = await newVisit.save();
        if (!inserted)
          throw new Error("[ERROR] : Failed to insert entry in visits");
        else console.log("[INFO] : Success");
        res.status(200).json(inserted);
      }
    } else if (login.userrole == 1) {
      // store owner
      const userid = await validateuser(storeOwnerModel, login);
      if (userid) {
        req.session.user = userid;
        req.session.role = 1;
      }
    } else if (login.userrole == 0) {
      // mall owner
      if (login.username == "admin" && login.password == "admin") {
        req.session.userId = "Admin";
        req.session.role = 0;
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
