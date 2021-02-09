const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const slug = require("slug");

exports.post = (req, res) => {
    res.render("create-post");
};

exports.postAction = async (req, res) => {
    req.body.tags = req.body.tags.split(",").map((tag) => tag.trim());
    req.body.slug = slug(req.body.title);

    const post = new Post(req.body);

    try {
        await post.save();
    } catch (e) {
        console.error(e);
    }
    res.redirect("/");
};
