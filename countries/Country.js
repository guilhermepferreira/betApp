const Sequelize = require('sequelize');
const connection = require('../database/database');

const Country = connection.define('countries', {
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    flag:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

Country.sync({force:false});
module.exports = Country;