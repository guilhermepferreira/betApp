const Sequelize = require('sequelize');
const connection = require('../database/database');
const Match = require('./Match');
const Team = require('../teams/Team');

const MatchTeam = connection.define('match_teams', {
    team_api_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    team_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    home_away: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

});
Match.hasMany(MatchTeam);
Team.hasMany(MatchTeam);
MatchTeam.belongsTo(Match);
MatchTeam.belongsTo(Team);
MatchTeam.sync({force:false});
module.exports = MatchTeam;