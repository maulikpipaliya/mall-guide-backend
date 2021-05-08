var express = require("express");
var router = express.Router();

//data from database
var services = require("./data/services.json");

router.get("/", function (req, res) {
  res.json(services);
});

router.get("/:id([0-9]{3,})", function (req, res) {
  var currService = services.filter(function (service) {
    if (service.id == req.params.id) {
      return true;
    }
  });
  if (currService.length == 1) {
    res.json(currService[0]);
  } else {
    res.status(404); //Set status to 404 as service was not found
    res.json({ message: "Not Found" });
  }
});

module.exports = router;
