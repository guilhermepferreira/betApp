const adminGestor = require('../../admin/adminGestor');

function isLogged(req,res,next){
    if (req.session.user !== undefined) {
        adminGestor(req.session.user).then(result => {
            res.redirect('/admin/')
        }).catch(err => {
            console.log(err);
            next();
        })
    } else {
        console.log("FODAS");
        res.redirect("/");
    }
}

module.exports = isLogged;