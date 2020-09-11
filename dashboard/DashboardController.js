const express = require('express');
//Middlewares
const authMiddleware = require('../middlewares/authentication/Auth');
const router = express.Router();


router.get('/', authMiddleware, (req, res) => {
    res.render('dashboard/index',{name:req.session.user.name});
});

module.exports = router;