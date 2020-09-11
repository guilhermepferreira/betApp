const Team = require('./Team');
const TeamLeague = require('./TeamLeague');

function createTeams(teams, league) {
    return new Promise((resolve, reject) => {
        teams.forEach((team, index) => {
            var attr = {
                team_id_api: team.team_id
            };
            Team.findOne({where: attr}).then(result => {
                if (result instanceof Team) {
                    teamLeagueExists(result, league).then(teamLeague => {
                        console.log("TeamLeague criado com sucesso, id: " + teamLeague.id)
                        if (index === teams.length -1) resolve();
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    Team.create({
                        team_id_api: team.team_id,
                        name: team.name,
                        code: team.code,
                        logo: team.logo,
                        country: team.country,
                        is_national: team.is_national,
                    }).then(response => {
                        console.log("Time criado com o id: " + response.id);
                        teamLeagueExists(response, league).then(teamLeague => {
                            console.log("TeamLeague criado com sucesso, id: " + teamLeague.id)
                            if (index === teams.length -1) resolve();
                        }).catch(err => {
                            console.log(err);
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        })
    });
}

function teamLeagueExists(team, league) {
    return new Promise((resolve, reject) => {
        TeamLeague.findOne({
            where: {
                leagueId: league.id,
                teamId: team.id
            }
        }).then(reg => {
            if (!(reg instanceof TeamLeague)) {
                TeamLeague.create({
                    leagueId: league.id,
                    teamId: team.id,
                }).then(value => {
                    resolve(value);
                })
            } else {
                resolve(reg);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

module.exports = createTeams;