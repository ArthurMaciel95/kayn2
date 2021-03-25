const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.index = async (req, res) => {
    let dataIndex = {
        posts: [],
        tags: [],
        tag: "",
        sumPost: ""
    };

    dataIndex.tag = req.query.t;

    const postFilter =
        dataIndex.tag !== undefined ? { tags: dataIndex.tag } : {};

    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.find(postFilter).populate("author", "name");

    // Story.
    // findOne({ title: 'Casino Royale' }).
    // populate('author').
    // exec(function (err, story) {
    //   if (err) return handleError(err);
    //   console.log('The author is %s', story.author.name);
    //   // prints "The author is Ian Fleming"
    // });

    const sumPost = Post.countDocuments();

    const [tags, posts, sum] = await Promise.all([
        tagsPromise,
        postsPromise,
        sumPost
    ]);

    dataIndex.tags = tags;
    dataIndex.posts = posts;
    dataIndex.sumPost = sum;

    res.render("index", { dataIndex });
};

exports.delete = async (req, res) => {
    try {
        await Post.findOneAndDelete({ id: req.params._id });
    } catch (e) {
        console.log(e);
    }
};
