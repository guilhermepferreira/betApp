const Sequelize = require('sequelize');
const connection = require('../database/database');
const League = require('../leagues/League');
const Score = require('../scores/Score');

const Match = connection.define('matches', {
    match_api_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    event_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    event_timestamp: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    firstHalfStart: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    secondHalfStart: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    round: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true
    },
    statusShort: {
        type: Sequelize.STRING,
        allowNull: true
    },
    elapsed: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    goalsHomeTeam: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    goalsAwayTeam: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    oddHomeWin: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    oddDraw: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    oddAwayWin: {
        type: Sequelize.FLOAT,
        allowNull: true
    },

});

Match.hasOne(Score);
Score.belongsTo(Match);
Match.belongsTo(League);
Match.sync({force:false});
module.exports = Match;