var express = require("express");
var router = express.Router();

//data from database
var rateModel = require("../../models/rate-model");

//get all ratings
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all ratings");
  const all_ratings = await rateModel.find();
  res.json(all_ratings);
});

//create a new rating
router.post("/", async function (req, res) {
  const newStore = new rateModel(req.body);
  try {
    const inserted = await newStore.save();
    if (!inserted) throw new Error("[ERROR] : Failed to insert");
    else console.log("[INFO] : Success. Inserted Data");
    res.status(200).json(inserted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//update a rating
// router.put("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     res.body.updated_at = Date.now();
//     const response = await rateModel.findByIdAndUpdate(id, req.body);
//     if (!response) throw new Error("[ERROR] : Failed to update");
//     const updated = { ...response._doc, ...req.body };
//     console.log("[INFO] : Success. Updated Data");
//     res.status(200).json(updated);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

//delete a rating
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     res.body.updated_at = Date.now();
//     res.body.is_deleted = true;
//     const deleted = await rateModel.findByIdAndUpdate(id, req.body);
//     if (!deleted) throw new Error("[ERROR] : Failed to delete");

//     res.status(200).json(deleted);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

//Get particular rating
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const response = await rateModel.findById(id, req.body);
//     if (!response) throw new Error("[ERROR] : Failed to get a rating " + id);
//     const categoryDetails = { ...response._doc, ...req.body };
//     res.status(200).json(categoryDetails);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

module.exports = router;
