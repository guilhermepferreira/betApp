const express = require('express');
const router = express.Router();
const Service = require('./services/Services');
const leagueGestor = require('../leagues/LeagueGestor');
const teamsGestor = require('../teams/TeamsGestor');
const League = require('../leagues/League');

router.get('/', (req, res) => {
    res.send("AQUo")
});

router.get('/services/get-leagues/:country/:year?', (req, res) => {
    var {country, year} = req.params;
    if (req.params.year === undefined) {
        year = 2020;
    }

    Service.getLeaguesByCountry(country, year).then(leagues => {
        leagueGestor(leagues);
    }).catch(err => {
        console.log(err);

    });

});


router.get('/services/get-teams/:league', (req, res) => {
    League.findOne({
        where: {
            id: req.params.league
        }
    }).then(league => {
        Service.getTeamsByLeague(league).then(teams => {
            teamsGestor(teams, league).then(response => {
                res.redirect('/admin/')
            });
        }).catch(err => {
            console.log(err);
        });
    })


});
module.exports = router;