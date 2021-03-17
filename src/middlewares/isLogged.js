exports.userLogged = (req, res , next) =>{
    if(!req.session.user){
        req.flash('error', 'You need be logged!')
        res.redirect('/login')
    }

    next()
}