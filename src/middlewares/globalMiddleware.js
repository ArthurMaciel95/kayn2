const { helpers } = require("../helpers/navbarLinks");

exports.middlewareGlobal = (req, res, next) => {

    if(req.session.user){
        helpers.filter( helper => helper.logged === true)
        console.log('logged');
    } else {
        helpers.filter( helper => helper.guest === true)
        console.log('notlogged');
    }




    res.locals._user = req.session.user
    res.locals.h = helpers;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
};
