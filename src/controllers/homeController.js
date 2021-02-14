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
    const postFilter =
        dataIndex.tag !== undefined ? { tags: dataIndex.tag } : {};

    console.log(typeof dataIndex.tag);

    const tags = await Post.getTagsList();
    dataIndex.tags = tags;

    const sumPost = await Post.getNumberPost();
    dataIndex.sumPost = sumPost;
    console.log(sumPost);

    const posts = await Post.find(postFilter);
    dataIndex.posts = posts;

    res.render("index", { dataIndex });
};
