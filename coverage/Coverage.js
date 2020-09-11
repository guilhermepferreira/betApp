const Sequelize = require('sequelize');
const connection = require('../database/database');

const Coverage = connection.define('coverages', {
    standings:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    players:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    topScorers:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    predictions:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    odds:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    events:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    lineups:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    statistics:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    players_statistics:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }


});

Coverage.sync({force:false});
module.exports = Coverage;