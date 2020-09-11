const express = require('express');
const router = express.Router();
const Auth = require('./Auth');

router.post('/login', (req, res) => {
    var {email, password} = req.body;

    Auth(email, password, (response) =>{
       if (!response.success) {
            res.redirect("/")
       }
        //Autentica o usuario
        req.session.user = {
            id: response.user.id,
            name: response.user.name,
            nickname: response.user.nickname
        }

       res.redirect('/dashboard/');
    })

});

router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
})

module.exports = router;