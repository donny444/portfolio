require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = require("./mysql.js");
connection.connect(function(err) {
    if (err) throw err;
    console.log(`MySQL connected as ID ${connection.threadId}`);
})

const routes = require("./router/routes.js");

app.use("/", routes);

module.exports = app;