const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.index = async (req, res) => {
    let dataIndex = {
        posts: [],
        tags: [],
        tag: "",
        sumPost: "",
    };

    dataIndex.tag = req.query.t;

    console.log(dataIndex.tag);
    const postFilter =
        dataIndex.tag !== undefined ? { tags: dataIndex.tag } : {};

    const tags = await Post.getTagsList();
    const posts = await Post.find(postFilter);
    const sumPost = await Post.countDocuments();

    dataIndex.sumPost = sumPost;
    dataIndex.tags = tags;

    dataIndex.posts = posts;

    res.render("index", { dataIndex });
};

exports.delete = async (req, res) => {
    try {
        await Post.findOneAndDelete({ id: req.params._id });
    } catch (e) {
        console.log(e);
    }
};
