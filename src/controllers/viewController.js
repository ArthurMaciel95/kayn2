const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.view = async (req, res) => {
    const postData = {
        data: [],
    };

    const onePost = await Post.findOne({ _id: req.params._id });

    postData.data = onePost;

    res.render("view", { postData });
};
