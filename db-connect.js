const mongoose = require("mongoose");
const { mongoUri, PORT } = require("./config");

const db = mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(
      "[INFO] : Database Connection SUCCESS. MongoDB database Connected"
    )
  )
  .catch((err) => console.log(err));

module.exports = db;
