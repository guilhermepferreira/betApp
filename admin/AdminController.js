const express = require('express');
const router = express.Router();
const Service = require('./services/Services');
const leagueGestor = require('../leagues/LeagueGestor');
const teamsGestor = require('../teams/TeamsGestor');
const League = require('../leagues/League');
const Country = require('../countries/Country');
const countryGestor = require('../countries/CountryGestor');
const adminMiddlewre = require('../middlewares/Admin');
const Team = require('../teams/Team');
const Match = require('../matches/Match');
const MatchTeam = require('../matches/MatchTeam');
const Scores = require('../matches/MatchTeam');
const matchGestor = require('../matches/MatchGestor');
const Bookmarker = require('../bookmakers/Bookmaker');
const Odd = require('../odds/Odd');

router.get('/', adminMiddlewre,(req, res) => {
    res.render('admin/index', {name: req.session.user.name});
});

router.get('/services/get-leagues/:country/:year?',adminMiddlewre, (req, res) => {
    var {country, year} = req.params;
    if (req.params.year === undefined) {
        var todaysDate = new Date()
        year = todaysDate.getFullYear()
    }
    Service.getLeaguesByCountry(country, year).then(leagues => {
        if (leagues.length === 0) {
            res.redirect('/admin/api');
        }
        leagueGestor(leagues).then(() =>{
            res.redirect('/admin/api')
        }).catch(err =>{
            console.log(err)
        });
    }).catch(err => {
        console.log(err);

    });

});


router.get('/services/get-teams/:league',adminMiddlewre, (req, res) => {
    League.findOne({
        where: {
            id: req.params.league
        }
    }).then(league => {
        Service.getTeamsByLeague(league).then(teams => {
            teamsGestor(teams, league).then(response => {
                res.redirect('/admin/api')
            });
        }).catch(err => {
            console.log(err);
        });
    })


});

router.get('/services/get-countries', adminMiddlewre,(req, res) => {
    Service.getCountries().then(result => {
        countryGestor.createCountries(result).then(() => {
            res.redirect('/admin/api')
        })
    });
});

router.get('/services/get-players/:team_id', adminMiddlewre,(req, res) => {

});

router.get('/services/get-matches/:league_id',adminMiddlewre, (req, res) => {
        var {league_id} = req.params;
        League.findOne({where:{
            id:league_id
            }}).then(league =>{
                if (!(league instanceof League)) {
                    res.redirect('/admin/api');
                }
            (async () => {
                try {
                    var matches = await Service.getMatchesByLeagueId(league);
                    await matchGestor.createMatch(matches,league);
                    res.redirect('/admin/api');
                } catch (err){
                    console.log(err);
                    res.redirect('/admin/api');
                }
            })();
        })
});


router.post('/country/remove', adminMiddlewre,(req, res) => {
    var {country_id} = req.body;

    if (country_id === undefined || isNaN(country_id)) {
        res.redirect('/admin/api');
    }
    countryGestor.countryDestroy(country_id).then((response) =>{
        res.redirect('/admin/api');
    }).catch(err => {
        res.redirect('/admin/api');
    });

});

router.get('/api/', adminMiddlewre, (req, res) => {
    (async () => {
        var countries = await Country.findAll();
        var leagues = await League.findAll();
        var teams = await Team.findAll();
        res.render('admin/api', {name: req.session.user, countries: countries, leagues: leagues, teams: teams})
    })();
});
module.exports = router;