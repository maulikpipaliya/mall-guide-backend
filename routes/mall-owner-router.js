var express = require("express");
var router = express.Router();

//data from database
var mall_owners = require("./data/mall-owners.json");

router.get("/", function (req, res) {
  res.json(mall_owners);
});

router.get("/:id([0-9]{3,})", function (req, res) {
  var currMallOwner = mall_owners.filter(function (mall_owner) {
    if (mall_owner.id == req.params.id) {
      return true;
    }
  });
  if (currMallOwner.length == 1) {
    res.json(currMallOwner[0]);
  } else {
    res.status(404); //Set status to 404 as Mall Owner was not found
    res.json({ message: "Not Found" });
  }
});

module.exports = router;
