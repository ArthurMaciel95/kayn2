const { helpers } = require("../helpers/navbarLinks");

exports.middlewareGlobal = (req, res, next) => {
    res.locals.h = helpers;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
};
