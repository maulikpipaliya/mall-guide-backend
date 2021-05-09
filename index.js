var express = require("express");
var bodyParser = require("body-parser");
const CONFIG = require("./config");
const db = require("./db-connect");
const cors = require("cors");

var app = express();

// app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

//use sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

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
var visitor_router = require("./routes/visitor-router");
var login_router = require("./routes/login-router");
var registration_visitor_router = require("./routes/visitor/registration-visitors-router");
var rating_visitior_router = require("./routes/visitor/rating-router");
var store_request_router = require("./routes/store-request-router");
var store_request_mall_owner_router = require("./routes/mall-owner/store-request-mall-owner-router");

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
app.use("/visitor", visitor_router);
app.use("/login", login_router);
app.use("/registration", registration_visitor_router);
app.use("/rate", rating_visitior_router);
app.use("/sendstorerequest", store_request_router);
app.use("/storerequest", store_request_mall_owner_router);

app.listen(CONFIG.PORT, () =>
  console.log(`[INFO] : App listening at http://localhost:${CONFIG.PORT}`)
);
