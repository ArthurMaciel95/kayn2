const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcryptjs = require("bcryptjs");

// REGISTER SECTION
exports.signUp = async (req, res) => {
    res.render("sing-up");
};

exports.singUpAction = async (req, res) => {
    try {
        const userAreadyExists = await User.findOne({ email: req.body.email });

        if (userAreadyExists) {
            return res.send({ message: "user aready exists" });
        }
    } catch (e) {
        console.error(e);
    }

    const salt = bcryptjs.genSaltSync();
    req.body.password = bcryptjs.hashSync(req.body.password, salt);

    try {
        const user = new User(req.body);
        await user.save();
    } catch (err) {
        console.log(err);
    }

    res.redirect("/");
};

// LOGIN SECTION
exports.login = (req, res) => {
    res.render("login");
};

exports.loginAction = async (req, res) => {
    res.redirect("/");
};

//###################################/

exports.users = async (req, res) => {
    obj = {
        users: "",
    };

    const AllUser = await User.find();
    obj.users = AllUser;

    res.render("user", { obj });
};
