const Sequelize = require('sequelize');
const connection = require('../database/database');
const League = require('../leagues/League');
const Team = require('./Team');
const TeamLeague = connection.define('TeamLeagues', {

});
TeamLeague.belongsTo(League);
TeamLeague.belongsTo(Team);
TeamLeague.sync({force:false});
module.exports = TeamLeague;