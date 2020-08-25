// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: "session",
  keys: ['user_id']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
<<<<<<< HEAD
// const homepageRoute = require("./routes/homepage");
=======
const logoutRoute = require("./routes/logout");
>>>>>>> eb577dd01c74b87229647dafd9315a2c6f0ed6a2

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/register", registerRoute(db));
app.use("/login", loginRoute(db));
<<<<<<< HEAD
// app.use("/quizzes", homepageRoute(db));
=======
app.use("/logout", logoutRoute(db));

>>>>>>> eb577dd01c74b87229647dafd9315a2c6f0ed6a2

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {

  let query = `SELECT name, description, photo_url FROM quizzes;`;
  db.query(query)
      .then(data => {
        const widgets = data.rows;

        const quizObj = {};
        for (let i = 0; i < widgets.length; i++) {
          quizObj[i] = {name : widgets[i].name, description: widgets[i].description, url: widgets[i].photo_url};
        }

        let templateVars = {quizObj};
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
