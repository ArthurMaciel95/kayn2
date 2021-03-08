const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.categories = async (req, res) => {
    const obj = {
        categories: "",
        categoriesTags: "",
    };
    obj.categories = req.query.c;

    const tags = Post.getCategoriesList();
    obj.categoriesTags = tags;
    const categoriesFilter =
        obj.categories !== undefined ? { category: obj.categories } : {};

    const searchCategories = await Post.find(categoriesFilter);
    console.log(obj.categories);

    res.render("category", { obj });
};
