const Team = require('../teams/Team');
const League = require('../leagues/League');
const Score = require('../scores/Score');
const Match = require('../matches/Match');
const MatchTeam = require('../matches/MatchTeam');
const matchTeamHome = 0;
const matchTeamAway = 1;


function createMatch(matches, league) {
    return new Promise((resolve, reject) => {
        matches.forEach((match, index) => {
            (async () => {
                try {
                    var matchExist = await matchExists(match);
                    if (matchExist) {
                        return;
                    }
                    const attributesMatch = {
                        match_api_id: match.fixture_id,
                        event_date: match.event_date,
                        event_timestamp: match.event_timestamp,
                        firstHalfStart: match.firstHalfStart,
                        secondHalfStart: match.secondHalfStart,
                        round: match.round,
                        status: match.status,
                        statusShort: match.statusShort,
                        elapsed: match.elapsed,
                        goalsHomeTeam:match.goalsHomeTeam,
                        goalsAwayTeam: match.goalsAwayTeam,
                        leagueId: league.id,
                    };
                    var newMatch = await Match.create(attributesMatch);
                    var homeTeam = await createMatchTeam(newMatch, match.homeTeam.team_id, matchTeamHome);
                    var awayTeam = await createMatchTeam(newMatch, match.awayTeam.team_id, matchTeamAway);
                    console.log("match criada id: "+ newMatch.id+ 'match team ids: '+homeTeam.id +' '+ awayTeam.id);
                    if (index === matches.length - 1) resolve("Done");
                } catch (error) {
                    console.log(error)
                    if (index === matches.length - 1) reject(error);
                }
            })();
        });
    });
}

function createMatchTeam(match, teamApiId, home) {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                var team = await Team.findOne({where: {team_id_api: teamApiId}});
                var matchTeam = await MatchTeam.create({
                    team_api_id: team.team_id_api,
                    team_name: team.name,
                    home_away: home,
                    matchId: match.id,
                    teamId: team.id
                })
                resolve(matchTeam);
            } catch (error) {
                reject(error);
            }
        })();
    })
}

function matchExists(match) {
    return new Promise((resolve, reject) => {
        Match.findOne({
            where: {
                match_api_id: match.fixture_id
            }
        }).then(result => {
            if (!(result instanceof Match)) {
                resolve(false);
            } else {
                resolve(true);
            }
        }).catch(err => {
            reject(err);
        })
    });
}

module.exports = {createMatch}