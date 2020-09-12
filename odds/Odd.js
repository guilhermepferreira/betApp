const Sequelize = require('sequelize');
const connection = require('../database/database');
const Match = require('../matches/Match');
const Bookmarker = require('../bookmakers/Bookmaker');

const Odd = connection.define('odds', {
    home: {
        type: Sequelize.STRING,
        allowNull: true
    },
    draw: {
        type: Sequelize.STRING,
        allowNull: true
    },
    away: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

Odd.belongsTo(Match);
Odd.belongsTo(Bookmarker);
Odd.sync({force:false});
module.exports = Odd;