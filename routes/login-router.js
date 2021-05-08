var express = require("express");
var router = express.Router();

//data from database
var visitorModel = require("../models/visitor-model");



router.post("/", async (req, res) => {
  const login = req.body;
  try {
    if (login.userrole == 0) {
      let visitor = await visitorModel.find({ username : login.username });
      // console.log(login);
      // console.log(visitor);
      if(!visitor)
      {
         visitor = await visitorModel.find({ contact : login.username });
        if(!visitor)
        {
           visitor = await visitorModel.find({ email : login.username });
            if(!visitor)
            {
              res.status(500).json({
                message: error.message,
              });
            }
        }
        else if (visitor[0].password == login.password) {
          console.log("successfully Login....");    
        }
      }
      else
      res.status(500).json({
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
