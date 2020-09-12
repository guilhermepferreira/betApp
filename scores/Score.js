const Sequelize = require('sequelize');
const connection = require('../database/database');


const Score = connection.define('scores', {
    halftime: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fulltime: {
        type: Sequelize.STRING,
        allowNull: true
    },
    extratime: {
        type: Sequelize.STRING,
        allowNull: true
    },
    penalty: {
        type: Sequelize.STRING,
        allowNull: true
    }
});


Score.sync({force:false});
module.exports = Score;