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
        required: "o corpo precisa ser preenchido"
    },
    tags: [String],
    author: {
        type: mongoose.SchemaTypes.ObjectId,
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

module.exports = mongoose.model("Post", postSchema);
