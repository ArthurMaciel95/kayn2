const mongoose = require("mongoose");
// const moment = require("moment");

// const slug = require("slug");
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    photo: { type: String },
    title: {
        type: String,
        trim: true,
        required: true
    },
    subtitle: { type: String, trim: true, required: true },
    slug: String,
    body: {
        type: String,
        trim: true,
        required: true
    },
    tags: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: { type: String, trim: true, required: true },
    createDate: { type: Date, default: Date.now() }
});

postSchema.statics.getTagsList = function () {
    return this.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
    ]);
};

// postSchema.statics.getAuthor = function (filters = {}) {
//     return this.aggregate([
//         { $match: filters },
//         {
//             $lookup: {
//                 from: "users",
//                 let: { 'author': "$author" },
//                 pipeline: [
//                     { $match: { $expr: { $eq: ["$$author", "$_id"] } } },
//                     { $limit: 1 }
//                 ],
//                 as: "author"
//             }
//         },
//         {
//             $addFields: {
//                 'author': { $arrayElemAt: ["$author", 0] }
//             }
//         }
//     ]);
// };

module.exports = mongoose.model("Post", postSchema);
