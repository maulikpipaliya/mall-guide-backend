var express = require("express");
var router = express.Router();

//data from database
var feedbacks = require("./data/feedbacks.json");

router.get("/", function (req, res) {
  res.json(feedbacks);
});

router.get("/:id([0-9]{3,})", function (req, res) {
  var currFeedback = feedbacks.filter(function (feedback) {
    if (feedback.id == req.params.id) {
      return true;
    }
  });
  if (currFeedback.length == 1) {
    res.json(currFeedback[0]);
  } else {
    res.status(404); //Set status to 404 as Feedback was not found
    res.json({ message: "Not Found" });
  }
});

module.exports = router;
