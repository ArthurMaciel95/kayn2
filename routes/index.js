const express = require("express");
const router = express.Router();

const homeController = require("../src/controllers/homeController");
const postController = require("../src/controllers/postController");
const viewController = require("../src/controllers/viewController");

router.get("/", homeController.index);

router.get("/create-post", postController.post);
router.post("/create-post", postController.postAction);

router.get("/post/:_id", viewController.view);

module.exports = router;
