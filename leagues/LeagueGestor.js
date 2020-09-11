const League = require('./League');
const Coverage = require('../coverage/Coverage');

function createLeagues(leagues) {
    return new Promise((resolve, reject) => {
        console.log(leagues);
        leagues.forEach((league, index) => {
            League.findOne({where: {league_api_id: league.league_id}}).then(exist => {
                if (exist === undefined || exist === null) {
                    if (league.coverage.odds) {
                        var attr = {
                            standings: league.coverage.standings,
                            players: league.coverage.players,
                            topScorers: league.coverage.topScorers,
                            predictions: league.coverage.predictions,
                            odds: league.coverage.odds,
                            events: league.coverage.fixtures.events,
                            lineups: league.coverage.fixtures.lineups,
                            statistics: league.coverage.fixtures.statistics,
                            players_statistics: league.coverage.fixtures.players_statistics,
                        }
                        getCoverage(attr).then(coverage => {
                            League.create({
                                league_api_id: league.league_id,
                                name: league.name,
                                type: league.type,
                                country: league.country,
                                country_code: league.country_code,
                                season: league.season,
                                season_start: league.season_start,
                                season_end: league.season_end,
                                logo: league.logo,
                                flag: league.flag,
                                standings: league.standings,
                                is_current: league.is_current,
                                coverageId: coverage.id
                            }).then(league => {
                                console.log(league.id);
                                if (index === leagues.length -1) resolve();
                            }).catch(err => {
                                console.log(err);
                                if (index === leagues.length -1) reject(err);
                            })
                        }).catch(err =>{
                            if (index === leagues.length -1) reject(err);
                        })
                    } else {
                        if (index === leagues.length -1) resolve();
                    }
                }
            }).catch(err => {
                console.log(err);
                if (index === leagues.length -1) reject(err);
            });
        });
    });
}

function getCoverage(attr) {
    return new Promise((resolve, reject) => {
        Coverage.findOne({where: attr}).then(result => {
            if (result instanceof Coverage) {
                resolve(result);
            } else {
                Coverage.create(attr).then(coverage => {
                    resolve(coverage);
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err);
        })
    });
}


module.exports = createLeagues;