"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/tweeter";
const client = new MongoClient(url);
const dbName = 'tweeter';


async function runMongoClient() {
  await client.connect();
  console.log('Connected successfully to MongoDB Server')
  const db = client.db(dbName);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use('/tweets', tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
}

runMongoClient();