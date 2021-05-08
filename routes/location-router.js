var express = require("express");
var router = express.Router();

//data from database
var locations = require("./data/locations.json");

router.get("/", function (req, res) {
  res.json(locations);
});

router.get("/:id([0-9]{3,})", function (req, res) {
  var currLocation = locations.filter(function (location) {
    if (location.id == req.params.id) {
      return true;
    }
  });
  if (currLocation.length == 1) {
    res.json(currLocation[0]);
  } else {
    res.status(404); //Set status to 404 as movie was not found
    res.json({ message: "Not Found" });
  }
});

module.exports = router;
