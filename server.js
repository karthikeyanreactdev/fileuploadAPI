const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./config.js");

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb", extended: true }));

//mongoose.Promise = global.Promise;

//Connecting to the database

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
    res.json({
        message: "Project is running"
    });
});

require("./route/uploadRoute")(app);


// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 80");
});