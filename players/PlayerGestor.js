const Sequelize = require('sequelize');
const connection = require('../database/database');
const UserType = require('./UserType');

const User = connection.define('players', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    } ,
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
UserType.hasMany(User);
User.belongsTo(UserType);
User.sync({force:false});
module.exports = User;