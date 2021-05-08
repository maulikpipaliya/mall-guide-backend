var express = require("express");
var bodyParser = require("body-parser");
const CONFIG = require('./config')
const db = require('./db-connect')

var app = express();

// app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

//Routers
var store_router = require("./routes/store-router");
var event_router = require("./routes/event-router");
var store_owner = require("./routes/store-owner-router");
var feedback = require("./routes/feedback-router");
var location = require("./routes/location-router");
var mall_owner = require("./routes/mall-owner-router");
var offer = require("./routes/offer-router");
var service = require("./routes/service-router");

//Use the Router on the sub route /movies
app.use("/stores", store_router);
app.use("/events", event_router);
app.use("/store_owner", store_owner);
app.use("/feedback", feedback);
app.use("/location", location);
app.use("/mall_owner", mall_owner);
app.use("/offer", offer);
app.use("/service", service);


app.listen(CONFIG.PORT, () => console.log(`[INFO] : App listening at http://localhost:${CONFIG.PORT}`))