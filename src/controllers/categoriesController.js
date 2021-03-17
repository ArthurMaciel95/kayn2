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
        obj.categories !== undefined ? { category: obj.categoriesTags } : {};

    const searchCategories = await Post.find(categoriesFilter);
   

    res.render("category", { obj });
};
