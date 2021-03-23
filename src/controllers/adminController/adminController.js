const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.index = (req, res) => {
    res.render("painel-control");
};

exports.banned = async (req, res) => {
    try {
        const user = await User.updateOne(
            { _id: req.params._id },
            { $set: { isBanned: true } }
        );

        console.log(user);
    } catch (err) {
        console.log(err);
    }

    req.flash("success", `User: %% is banned with success!`);
    res.redirect("/login");
};
