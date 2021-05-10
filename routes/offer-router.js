var express = require("express");
var router = express.Router();

//data from database
var offerModel = require("../models/offer-model");

//get all offers
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all offers");
  const all_offers = await offerModel.find({ is_deleted: false });
  // res.json(all_offers);
  res.render("../views/pages/offer-page",{all_offer:all_offer});
});

//create a new offer
router.post("/", async function (req, res) {
  const newStore = new offerModel(req.body);
  try {
    const inserted = await newStore.save();
    if (!inserted) throw new Error("[ERROR] : Failed to insert");
    else console.log("[INFO] : Success. Inserted Data");
    //res.status(200).json(inserted);
    res.redirect("/home");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//update a offer
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.body.updated_at = new Date();
    const response = await offerModel.findByIdAndUpdate(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to update");
    const updated = { ...response._doc, ...req.body };
    console.log("[INFO] : Success. Updated Data");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete a offer
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.body.updated_at = new Date();
    res.body.is_deleted = true;
    const deleted = await offerModel.findByIdAndUpdate(id, req.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular offer
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await offerModel.findById(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to get a offer " + id);
    const offerDetails = { ...response._doc, ...req.body };
    res.status(200).json(offerDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
