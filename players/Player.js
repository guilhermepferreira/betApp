const Sequelize = require('sequelize');
const connection = require('../database/database');

const Player = connection.define('players', {


});

Player.sync({force:false});
module.exports = Player;