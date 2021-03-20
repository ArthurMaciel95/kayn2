const express = require("express");
const router = express.Router();

const homeController = require("../src/controllers/homeController");
const postController = require("../src/controllers/postController");
const viewController = require("../src/controllers/viewController");
const categoriesController = require("../src/controllers/categoriesController");
const userController = require("../src/controllers/userController");
const uploadMiddleware = require("../src/middlewares/uploadMiddleware");
const userIsLogged = require("../src/middlewares/isLogged");

router.get("/", homeController.index);

router.get("/create-post", userIsLogged.userLogged, postController.post);
router.post(
    "/create-post",
    uploadMiddleware.upload,
    uploadMiddleware.resize,
    postController.postAction
);

router.get("/sign-up", userController.signUp);
router.post(
    "/sign-up",
    uploadMiddleware.upload,
    uploadMiddleware.resize,
    userController.singUpAction
);

router.get("/login", userController.login);
router.post("/login", userController.loginAction);

router.get("/post/edit/:_id", userIsLogged.userLogged, postController.edit);
router.post(
    "/post/edit/:_id",
    uploadMiddleware.upload,
    uploadMiddleware.resize,
    postController.editAction
);

router.get("/post/:_id", userIsLogged.userLogged, viewController.view);

router.post(
    "/post/delete/:_id",
    userIsLogged.userLogged,
    postController.deletePost
);

router.get(
    "/categories",
    userIsLogged.userLogged,
    categoriesController.categories
);

router.get("/profile/:id", userIsLogged.userLogged, userController.profile);

router.get("/logout", userIsLogged.userLogged, userController.logout);

module.exports = router;
