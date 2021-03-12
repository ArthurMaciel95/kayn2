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
            return res.send({ message: "user aready exists in databse" });
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
    try{
        const UserExist = await User.findOne({email: req.body.email})

        if(!UserExist){
            return res.send({
                message:"User don't exist in databse"
            })
        }
        
        const password = bcryptjs.compareSync(req.body.password, UserExist.password);
        console.log(password);
        if(!password){
            return  res.send({
                message:"password is not correct"
            })
        } else {
            res.send({
                message:"login success"
            })
        }
        return res.redirect('/users')
    }catch(e){
        console.log(e)
    }

   
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
