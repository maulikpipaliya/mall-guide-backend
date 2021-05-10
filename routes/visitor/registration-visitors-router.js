var express = require("express");
var router = express.Router();

//data from database
var visitorModel = require("../../models/visitor-model");

router.post("/", async function (req, res) {
  const newVisitor = new visitorModel(req.body);
  try {
    const inserted = await newVisitor.save();
    if (!inserted) throw new Error("[ERROR] : Failed to insert");
    else console.log("[INFO] : Successfully Registered Visitor. ");
    // res.status(200).json(inserted);
    res.redirect("/signin");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
