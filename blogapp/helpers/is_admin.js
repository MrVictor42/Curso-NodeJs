module.exports = {
    eAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.is_admin == 1) {
            return next();
        }

        req.flash('error_msg', 'You need be a admin!');
        res.redirect('/');
    }
};