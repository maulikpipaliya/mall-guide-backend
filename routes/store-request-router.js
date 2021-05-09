var express = require("express");
var router = express.Router();

var storeRequestModel = require("../models/store-request-model");

//create a new store reuest
router.post("/", async function (req, res) {
    let newStoreRequest = new storeRequestModel(req.body);
    try {
      console.log(newStoreRequest.store_name);
        newStoreRequest.route_name = newStoreRequest.store_name.split(" ").join("-");
      const inserted = await newStoreRequest.save();
      if (!inserted) throw new Error("[ERROR] : Failed to insert");
      else console.log("[INFO] : Success. Inserted Data");
      res.status(200).json(inserted);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  module.exports = router;