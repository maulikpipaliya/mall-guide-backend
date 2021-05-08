var express = require("express");
var bodyParser = require("body-parser");
const CONFIG = require("./config");
const db = require("./db-connect");

var app = express();

// app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

//Routers
var store_router = require("./routes/store-router");
var event_router = require("./routes/event-router");
var store_owner_router = require("./routes/store-owner-router");
var feedback_router = require("./routes/feedback-router");
var location_router = require("./routes/location-router");
var mall_owner_router = require("./routes/mall-owner-router");
var offer_router = require("./routes/offer-router");
var services_router = require("./routes/service-router");
var categories_router = require("./routes/category-router");
var store_2_categories_router = require("./routes/store-2-category-router");

//Use the Router on the sub route /movies
app.use("/stores", store_router);
app.use("/events", event_router);
app.use("/store_owner", store_owner_router);
app.use("/feedbacks", feedback_router);
app.use("/locations", location_router);
app.use("/mall_owner", mall_owner_router);
app.use("/offers", offer_router);
app.use("/services", services_router);
app.use("/categories", categories_router);
app.use("/store-2-categoires", store_2_categories_router);

app.listen(CONFIG.PORT, () =>
  console.log(`[INFO] : App listening at http://localhost:${CONFIG.PORT}`)
);
