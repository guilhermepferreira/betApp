const express = require('express');
const router = express.Router();
const userGestor = require('./UserGestor');
const User = require('./User');

router.post('/save', (req, res) => {
    userGestor.createUser(req.body, (user) =>{
        if (!(user instanceof User)) {
            res.redirect('/user/create');
        }

        //Autentica o usuario
        req.session.user ={
            id: user.id,
            name: user.name,
            nickname: user.nickname
        }

        res.redirect('/dashboard/');
    });

});

router.post('/login', (req, res) => {

});
router.get('/create', (req, res) => {
    res.render('users/create')
});

module.exports = router;