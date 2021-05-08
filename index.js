var express = require("express");
var bodyParser = require("body-parser");
// var multer = require('multer');
// var upload = multer();

var app = express();

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

var store_router = require("./routes/store-router");
var event_router = require("./routes/event-router");
var store_owner = require("./routes/store-owner-router");
var feedback = require("./routes/feedback-router");

//Use the Router on the sub route /movies
app.use("/stores", store_router);
app.use("/events", event_router);
app.use("/store_owner", store_owner);
app.use("/feedback", feedback);

app.listen(3000);
