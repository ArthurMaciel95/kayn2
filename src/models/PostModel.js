const mongoose = require("mongoose");
// const moment = require("moment");

// const slug = require("slug");
mongoose.Promise = global.Promise;

function data() {
    const date = new Date();
    const day = zeroBeforeLeft(date.getDate());
    const month = zeroBeforeLeft(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function zeroBeforeLeft(value) {
    return value > 10 ? `${value}` : `0${value}`;
}

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
    createDate: { type: String, default: data() }
});

postSchema.statics.getTagsList = function () {
    return this.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
    ]);
};

postSchema.statics.getCategoriesList = function () {
    return this.aggregate([
        { $unwind: "$category" },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } }
    ]);
};

module.exports = mongoose.model("Post", postSchema);
