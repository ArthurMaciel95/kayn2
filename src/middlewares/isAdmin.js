exports.userAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role !== "admin") {
        req.flash("error", "Access Denied - this route only admin supported");
        res.redirect("/login");
        return;
    }

    next();
};
