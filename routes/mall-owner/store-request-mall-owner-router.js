var express = require("express");
var router = express.Router();

//data from database
var storeRequestModel = require("../../models/store-request-model");
var storeModel = require("../../models/store-model");

//get all stores
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all stores request");
  const all_stores_request = await storeRequestModel.find({
    is_approved: false,
  });
  res.json(all_stores_request);
});

// //create a new store
// router.post("/", async function (req, res) {
//   let newStore = new storeRequestModel(req.body);
//   try {
//     newStore.route_name = newStore.store_name.replaceAll(" ", "-");
//     const inserted = await newStore.save();
//     if (!inserted) throw new Error("[ERROR] : Failed to insert");
//     else console.log("[INFO] : Success. Inserted Data");
//     res.status(200).json(inserted);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

//update a store request
router.post("/:id/accept", async (req, res) => {
  const { id } = req.params;
  try {
    req.body.updated_at = Date.now();
    req.body.is_approved = true;
    req.body.is_deleted = true;
    // console.log(req.body);
    if (req.body.location_id == null)
      throw new Error("[ERROR] : Location_id is required");
    const response1 = await storeRequestModel.findByIdAndUpdate(id, req.body);
    if (!response1) throw new Error("[ERROR] : Failed to update");
    let newStore = new storeModel(response1._doc);
    newStore.location_id = req.body.location_id;
    newStore.updated_at = null;
    // console.log(newStore);
    // console.log(req.body.location_id);
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

router.put("/:id/deny", async (req, res) => {
  const { id } = req.params;
  try {
    req.body.updated_at = Date.now();
    req.body.is_approved = false;
    req.body.is_deleted = true;
    console.log(req.body);
    const response1 = await storeRequestModel.findByIdAndUpdate(id, req.body);
    if (!response1) throw new Error("[ERROR] : Failed to update");
    const updated = { ...response1._doc, ...req.body };
    console.log("[INFO] : Success. Updated Data");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
