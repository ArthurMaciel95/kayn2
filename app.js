const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/user");
const routesAdmin = require("./routes/admin");
const morgan = require("morgan");
const cors = require("cors");
const helpers = require("./src/helpers/navbarLinks");
const { middlewareGlobal } = require("./src/middlewares/globalMiddleware");
const pageNotFound = require("./src/middlewares/pageNotFound");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");

require("dotenv").config();

app.use(cors());

app.use(express.json());
app.set("views", path.resolve(__dirname, "src", "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SECRET));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);

app.use(flash());

app.use(middlewareGlobal);
app.use("/", routes);
app.use("/admin", routesAdmin);
app.use(pageNotFound.page404);
app.set("view engine", "ejs");

module.exports = app;
