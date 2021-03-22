const { helpers } = require("../helpers/navbarLinks");

exports.middlewareGlobal = (req, res, next) => {
    res.locals._user = req.session.user;
    res.locals.h = [...helpers];
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    if (req.session.user) {
        res.locals.h = res.locals.h.filter((link) => link.logged === true);

        if (req.session.user.role === "admin") {
            res.locals.h = res.locals.h.filter((link) => link.isAdmin === true);
        }
    } else {
        res.locals.h = res.locals.h.filter((link) => link.guest === true);
    }

    next();
};
