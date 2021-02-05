const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "src", "views"));

app.use("/", routes);

app.set("view engine", "ejs");

module.exports = app;
