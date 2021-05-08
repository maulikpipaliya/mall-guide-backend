var express = require("express");
var router = express.Router();

//data from database
var store_owner = require("./data/store-owner.json");

router.get("/", function (req, res) {
  res.json(store_owner);
});

router.get("/:id([0-9]{3,})", function (req, res) {
  var currStoreOwner = store_owner.filter(function (storeOwner) {
    if (storeOwner.id == req.params.id) {
      return true;
    }
  });
  if (currStoreOwner.length == 1) {
    res.json(currStoreOwner[0]);
  } else {
    res.status(404); //Set status to 404 as Store Owner was not found
    res.json({ message: "Not Found" });
  }
});

module.exports = router;
