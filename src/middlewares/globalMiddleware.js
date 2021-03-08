const { helpers } = require("../helpers/navbarLinks");

exports.middlewareGlobal = (req, res, next) => {
    res.locals.h = helpers;

    next();
};
