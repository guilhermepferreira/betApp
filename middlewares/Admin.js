const adminGestor = require('../admin/adminGestor');
function redirect(req, res, next) {
    if (req.session.user !== undefined){
        adminGestor(req.session.user).then(isAdmin =>{
            next();
        }).catch( err => {
            res.redirect('/dashboard/');
        })
    } else {
        res.redirect('/dashboard/');
    }
}

module.exports = redirect;