const { helpers } = require("../helpers/navbarLinks");

exports.middlewareGlobal = (req, res, next) => {
    res.locals._user = req.session.user
    res.locals.h = helpers;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
};
