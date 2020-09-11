const Sequelize = require('sequelize');
const connection = require('../database/database');

const Team = connection.define('teams', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    } ,
    team_id_api: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    logo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    country:{
        type: Sequelize.STRING,
        allowNull: false
    },
    is_national:{
        type: Sequelize.STRING,
        allowNull: false
    },


});
Team.sync({force:false});
module.exports = Team;