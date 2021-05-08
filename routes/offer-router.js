var express = require("express");
var router = express.Router();

//data from database
var offers = require("./data/offers.json");

router.get("/", function (req, res) {
  res.json(offers);
});

router.get("/:id([0-9]{3,})", function (req, res) {
  var currOffer = offers.filter(function (offer) {
    if (offer.id == req.params.id) {
      return true;
    }
  });
  if (currOffer.length == 1) {
    res.json(currOffer[0]);
  } else {
    res.status(404); //Set status to 404 as Offer was not found
    res.json({ message: "Not Found" });
  }
});

module.exports = router;
