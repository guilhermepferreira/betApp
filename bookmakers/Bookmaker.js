const Sequelize = require('sequelize');
const connection = require('../database/database');


const Bookmarker = connection.define('bookmarkers', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bookmarker_api_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});


Bookmarker.sync({force:false});
module.exports = Bookmarker;