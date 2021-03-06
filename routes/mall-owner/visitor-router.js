var express = require("express");
var router = express.Router();

//data from database
var visitorModel = require("../../models/visitor-model");
var visitsModel = require("../../models/visits-model");

//get all visitors
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all visitors");
  const all_visitors = await visitorModel.find({ is_deleted: false });
  res.json(all_visitors);
});

//create a new visitor
// router.post("/", async function (req, res) {
//   const newVisitor = new visitorModel(req.body);
//   try {
//     const inserted = await newVisitor.save();
//     if (!inserted) throw new Error("[ERROR] : Failed to insert");
//     else console.log("[INFO] : Success. Inserted Data");
//     res.status(200).json(inserted);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

//update a visitor
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    req.body.updated_at = new Date();
    const response = await visitorModel.findByIdAndUpdate(id, req.body);
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

//delete a visitor
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    req.body.updated_at = new Date();
    req.body.is_deleted = true;
    const deleted = await visitorModel.findByIdAndDelete(id, req.body);
    if (!deleted) throw new Error("[ERROR] : Failed to delete");

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular visitor
router.get("/age-wise-traffic", async (req, res) => {
  try {
    var b = new Date();
    var c = new Date();
    console.log(c.toLocaleString());
    c.setDate(c.getDate() - 7);
    console.log(c.toISOString());
    // const response = await visitsModel.find({
    //   created_at: { $gt: new ISODate(c) },
    // });
    // .sort({ visit_datetime: -1 });
    const response = visitsModel.find([{ $search: { range: { gt: c } } }]);
    console.log(response);
    if (!response) throw new Error("[ERROR] : Failed to get a visitor " + id);
    // const visitorDetails = { ...response._doc, ...req.body };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Get particular visitor
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await visitorModel.findById(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to get a visitor " + id);
    const visitorDetails = { ...response._doc, ...req.body };
    res.status(200).json(visitorDetails);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
