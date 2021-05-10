var express = require("express");
const session = require("express-session");
var bodyParser = require("body-parser");
const CONFIG = require("./config");
const db = require("./db-connect");
const cors = require("cors");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");

var app = express();
// Mihir

// set morgan to log info about our requests for development use.
// app.use(morgan("dev"));
app.use(express.static("./assets"));
// set the view engine to ejs
app.set("view engine", "ejs");

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 600000 * 6, // 1 hour
    },
  })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  // console.log("keshav");
  if (req.cookies.user_sid && !req.session.user) {
    // console.log("In If keshav");
    res.clearCookie("user_sid");
  }
  next();
});

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
var visitor_router = require("./routes/mall-owner/visitor-router");
var login_router = require("./routes/login-router");
var registration_visitor_router = require("./routes/visitor/registration-visitors-router");
var rating_visitior_router = require("./routes/visitor/rating-router");
var store_request_router = require("./routes/store-request-router");
var store_request_mall_owner_router = require("./routes/mall-owner/store-request-mall-owner-router");
// var landing_router = require("./routes/landing-router");
// var event_registration_router = require("./routes/event-registration-router");
var contactus_router = require("./routes/contactus-router");
var aboutus_router = require("./routes/aboutus-router");
var store_request = require("./routes/store-owner/store-owner-routes");

//Use the Router on the sub route /movies
app.use("/stores", store_router);
app.use("/events", event_router);
app.use("/store_owner", store_owner_router);
app.use("/feedbacks", feedback_router);
app.use("/locations", location_router);
app.use("/mall_owner", mall_owner_router);
app.use("/offer", offer_router);
app.use("/services", services_router);
app.use("/categories", categories_router);
app.use("/store-2-categoires", store_2_categories_router);
app.use("/visitor", visitor_router);
app.use("/login", login_router);
app.use("/registration", registration_visitor_router);
app.use("/rate", rating_visitior_router);
app.use("/sendstorerequest", store_request_router);
app.use("/storerequest", store_request_mall_owner_router);
app.use("/contactus", contactus_router);
app.use("/aboutus", aboutus_router);
app.use("/so", store_request);

// app.use("/landing", landing_router);

app.use("/", require("./client-routes"));
app.use("/mo", require("./routes/mall-owner/mall-owner-routes"));

app.use("/so", require("./routes/store-owner/store-owner-routes"));

app.listen(CONFIG.PORT, () =>
  console.log(`[INFO] : App listening at http://localhost:${CONFIG.PORT}`)
);
