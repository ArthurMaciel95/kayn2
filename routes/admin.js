const express = require("express");
const routerAdmin = express.Router();
const userIsLogged = require("../src/middlewares/isLogged");
const userIsAdmin = require("../src/middlewares/isAdmin");
const userController = require("../src/controllers/userController");
const adminController = require("../src/controllers/adminController/adminController");
const router = require("./user");

routerAdmin.get(
    "/users",
    userIsLogged.userLogged,
    userIsAdmin.userAdmin,
    userController.users
);

routerAdmin.post(
    "/users/delete-all",
    userIsLogged.userLogged,
    userIsAdmin.userAdmin,
    userController.deleteAllUsers
);

routerAdmin.get(
    "/painel-control",
    userIsLogged.userLogged,
    userIsAdmin.userAdmin,
    adminController.index
);

routerAdmin.get(
    "/admin/users/banned/:_id",
    userIsLogged.userLogged,
    userIsAdmin.userAdmin,
    adminController.banned
);

module.exports = routerAdmin;
