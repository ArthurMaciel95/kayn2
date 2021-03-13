const express = require("express");
const router = express.Router();

const homeController = require("../src/controllers/homeController");
const postController = require("../src/controllers/postController");
const viewController = require("../src/controllers/viewController");
const categoriesController = require("../src/controllers/categoriesController");
const userController = require("../src/controllers/userController");
const uploadMiddleware =require('../src/middlewares/uploadMiddleware')

router.get("/", homeController.index);

router.get("/create-post", postController.post);
router.post("/create-post", postController.postAction);

router.get("/sign-up", userController.signUp);
router.post("/sign-up",
uploadMiddleware.upload,
uploadMiddleware.resize,
userController.singUpAction);

router.get("/login", userController.login);
router.post("/login", userController.loginAction);

router.get("/post/edit/:_id", postController.edit);
router.post("/post/edit/:_id", postController.editAction);

router.get("/post/:_id", viewController.view);

router.post("/post/delete/:_id", postController.deletePost);

router.get("/categories", categoriesController.categories);

router.get("/users", userController.users);

router.get('/profile/:id',userController.profile)

module.exports = router;
