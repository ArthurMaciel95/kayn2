const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcryptjs = require("bcryptjs");
// const multer = require('multer')

// REGISTER SECTION
exports.signUp = async (req, res) => {
    res.render("sing-up");
};

exports.singUpAction = async (req, res) => {
    try {
        const userAreadyExists = await User.findOne({ email: req.body.email });

        if (userAreadyExists) {
            req.flash('error', 'Usuário já existente')
            return res.redirect('/sign-up')
        }
    } catch (e) {
        console.error(e);
    }

    if (req.body.password !== req.body['password-repeat']) {
        req.flash('error', 'Os Campos password precisão ser iguais');
        res.redirect('/sign-up')
        return;
    }

    const salt = bcryptjs.genSaltSync();
    req.body.password = bcryptjs.hashSync(req.body.password, salt);

    try {
        const user = new User(req.body);
        await user.save();
    } catch (err) {
        console.log(err);
    }
    req.flash('success', 'Usuário cadastrado com sucesso!')
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
            req.flash('error', 'Usuário não existe')
            return res.redirect("/login");
        }
        
        const password = bcryptjs.compareSync(req.body.password, UserExist.password);
        console.log(password);
        if(!password){
            req.flash('error', 'Senha Incorreta')
            res.redirect("/login");
        } else {
            req.flash('success', 'Logado com sucesso')
            res.redirect("/login");
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
