exports.userAdmin = (req, res, next)=>{
    if(req.session.user.role !== 'admin' ){
        req.flash('error', 'Acess Denied - this route only admin supported')
        res.redirect('/login')
    }

    
    

    next()
}