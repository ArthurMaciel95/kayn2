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
        //USER EXISTS
        if (userAreadyExists) {
            req.flash("error", "User Already Exist");
            res.status(404);
            return res.redirect("/sign-up");
        }
    } catch (e) {
        console.error(e);
    }

    // PASSWORD IS EQUAL
    if (req.body.password !== req.body["password-repeat"]) {
        req.flash("error", "The passwords fields need to be equal");
        res.status(412);
        res.redirect("/sign-up");
        return;
    }
    res.status(201);
    const salt = bcryptjs.genSaltSync();
    req.body.password = bcryptjs.hashSync(req.body.password, salt);

    try {
        const user = new User(req.body);
        await user.save();
    } catch (err) {
        console.log(err);
    }
    req.flash("success", "Successfully registered user");
    res.redirect("/login");
};

// LOGIN SECTION
exports.login = (req, res) => {
    res.render("login");
};

exports.loginAction = async (req, res) => {
    try {
        const UserExist = await User.findOne({ email: req.body.email });

        if (!UserExist) {
            req.flash("error", "Email or password are incorrect");
            res.status(404);
            return res.redirect("/login");
        }

        const password = bcryptjs.compareSync(
            req.body.password,
            UserExist.password
        );

        if (!password) {
            req.flash("error", "Incorrect password");
            res.status(401);
            return res.redirect("/login");
        }

        req.session.user = UserExist;

        console.log(req.session);

        req.flash("success", "Success login");
        res.status(202);
        return res.redirect("/categories");
    } catch (e) {
        console.log(e);
    }
};

//###################################/

exports.users = async (req, res) => {
    obj = {
        users: ""
    };

    const AllUser = await User.find();
    obj.users = AllUser;

    res.render("user", { obj });
};

exports.profile = async (req, res) => {
    obj = {
        profile: ""
    };

    const user = await User.findOne({ _id: req.params.id });
    obj.profile = user;

    res.render("profile", { obj });
};

exports.deleteAllUsers = async (req, res) => {
    //get all users in db
    try {
        const allUser = await User.find();

        if (allUser.length === 0) {
            req.flash("error", "no have users in database");
            res.redirect("/login");
            return;
        }

        const usersForDeleting = allUser.map((user) => user._id);

        const deleteProductsResponse = await User.deleteMany({
            _id: { $in: usersForDeleting }
        });
    } catch (err) {
        console.error(err);
    }
};

exports.logout = (req, res) => {
    req.session.destroy();

    return res.redirect("login");
};
