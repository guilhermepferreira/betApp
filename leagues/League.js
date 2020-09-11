const Sequelize = require('sequelize');
const connection = require('../database/database');
const Coverage = require('../coverage/Coverage');
const League = connection.define('leagues', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    leagueId: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country_code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    season:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    season_start:{
        type: Sequelize.STRING,
        allowNull: false
    },
    season_end: {
        type: Sequelize.STRING,
        allowNull: false
    },
    logo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    flag:{
        type: Sequelize.STRING,
        allowNull: false
    },
    standings:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    is_current:{
        type: Sequelize.INTEGER,
        allowNull:false
    }

});

Coverage.belongsTo(League);
League.belongsTo(Coverage);
League.sync({force:false});
module.exports = League;