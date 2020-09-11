//Framework
const express = require('express');
const app = express();

//Controllers
const userController = require('./users/UsersController');
const adminController = require('./admin/AdminController');
const authController = require('./authentication/AuthController');
const dashboardController = require('./dashboard/DashboardController');
const LeaguesController = require('./leagues/LeaguesController');
const teamsController = require('./teams/TeamsController');

//Utilitarios
const bodyParser = require('body-parser');
const session = require('express-session');
//Banco de dados
const connection = require('./database/database');

connection.authenticate().then(() => {
    console.log("conexão efetuada com banco de dados");
}).catch((err) => {
    console.log(err);
});


//Sessions
const TWO_HOURS = 1000* 60 * 60 * 10;
const {
    SESS_NAME = 'sid',
    SESS_SECRET = '728349&*&*¨FSAkjh3¨Q@!',
    SESS_LIFETIME = TWO_HOURS
} = process.env

app.use(session({
    name:SESS_NAME,
    resave: true,
    saveUninitialized: true,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: false
    }
}))

//Set
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Home
app.use('/users', userController);
app.use('/admin', adminController);
app.use('/auth', authController);
app.use('/dashboard', dashboardController);
app.use('/leagues', LeaguesController);
app.use('/teams', teamsController);



app.get('/', (req, res) => {
   res.render('authentication/login')
});

//Levanta o servidor
app.listen(8000, () => {
    console.log("server rodando na porta 8000")
})