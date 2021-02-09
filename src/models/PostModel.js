const mongoose = require("mongoose");
const moment = require("moment");

// const slug = require("slug");
mongoose.Promise = global.Promise;

// const ObjectId = mongoose.SchemaTypes.ObjectId;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    subtitle: { type: String, trim: true, required: true },
    slug: String,
    body: {
        type: String,
        trim: true,
        required: "o corpo precisa ser preenchido",
    },
    tags: [String],
    // author: {
    //     type: ObjectId,
    //     ref: "User",
    // },
    category: { type: String, trim: true, required: true },
    createDate: { type: String, default: moment().format("L") },
});

postSchema.statics.getTagsList = function () {
    return this.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
    ]);
};

postSchema.statics.getNumberPost = function () {
    return this.aggregate([{ $group: { _id: null, total: { $sum: 1 } } }]);
};

module.exports = mongoose.model("Post", postSchema);
