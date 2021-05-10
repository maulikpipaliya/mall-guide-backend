var express = require("express");
var router = express.Router();

var sessionChecker = (req, res, next) => {
  // console.log("keshav1111111 + " + req.session.user);
  if (req.session.user && req.session.role == 2 && req.cookies.user_sid) {
    res.redirect("/");
  } else {
    next();
  }
};


res.clearCookie("user_sid");



module.exports = router;
