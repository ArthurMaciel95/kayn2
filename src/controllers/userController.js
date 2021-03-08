const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.signUp = async (req, res) => {
    res.render("sing-up");
};

exports.singUpAction = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }

    res.redirect("/");
};

exports.users = async (req, res) => {
    obj = {
        users: "",
    };

    const AllUser = await User.find();
    obj.users = AllUser;

    res.render("user", { obj });
};
