const Sequelize = require('sequelize');
const connnection = new Sequelize('betApp', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    timeZone: '-03:00',
})

module.exports = connnection;