const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const slug = require("slug");
const moment = require("moment");

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

exports.edit = async (req, res) => {
    const obj = {
        edit: "",
    };
    try {
        const post = await Post.findOne({ _id: req.params._id });
        obj.edit = post;
    } catch (e) {
        console.log(e);
    }
    res.render("postedit", { obj });
};

exports.editAction = async (req, res) => {
    req.body.tags = req.body.tags.split(",").map((tag) => tag.trim());

    try {
        const postUpdate = await Post.findOne(
            { _id: req.params._id },
            req.body
        );
    } catch (error) {
        console.log(error);
    }

    res.redirect("/");
};

exports.deletePost = async (req, res) => {
    console.log("_post-id:" + req.params._id + " [ Deleted ]");
    try {
        const deletePost = await Post.deleteOne({ _id: req.params._id });
    } catch (err) {
        console.log(err);
    }

    res.redirect("/");
};
