var express = require("express");
var router = express.Router();

//data from database
var feedbackModel = require("../models/feedback-model");

//get all feedbacks
router.get("/", async function (req, res) {
  console.log("[INFO] : Getting all feedbacks");
  const all_services = await feedbackModel.find({ is_deleted: false });
  res.json(all_services);
});

//create a new feedback
router.post("/", async function (req, res) {
  const new_service = new feedbackModel(req.body);
  try {
    console.log("[INFO] : Adding new feedback");
    const inserted = await new_service.save();
    if (!inserted) throw new Error("[ERROR] : Failed to insert feedback");
    else console.log("[INFO] : Success. Created feedback");
    res.status(200).json(inserted);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//update a feedback
// router.put("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     console.log(res.body);
//     res.body.updated_at = Date.now();
//     const response = await feedbackModel.findByIdAndUpdate(id, res.body);
//     // if (!response) throw new Error("[ERROR] : --Failed to update");
//     const updated = { ...response._doc, ...req.body };
//     console.log("[INFO] : Success. Updated feedback");
//     res.status(200).json(updated);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//     consoloe.log(error);
//   }
// });

//delete a feedback
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     // console.log(res.body);
//     res.body.updated_at = Date.now();
//     res.body.is_deleted = true;
//     const deleted = await feedbackModel.findByIdAndUpdate(id, res.body);
//     if (!deleted) throw new Error("[ERROR] : Failed to delete feedback");

//     res.status(200).json(deleted);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

//Get particular feedback
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await feedbackModel.findById(id, req.body);
    if (!response) throw new Error("[ERROR] : Failed to get a feedback " + id);
    const service_details = { ...response._doc, ...req.body };
    res.status(200).json(service_details);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
