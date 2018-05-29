"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const MONGO_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGO_URI, (err, db) => {
  if(err) {
    console.log(`Failed to connect with ${MONGO_URI}`);
    throw err;
  }
  console.log(`CONNECTED to ${MONGO_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);


  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});

//



