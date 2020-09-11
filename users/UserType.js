// const Sequelize = require('sequelize');
// const connection = require('../database/database');
// const User = require('./User');
//
// const UserType = connection.define('user_types', {
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     slug: {
//         type: Sequelize.STRING,
//         allowNull: true
//     }
// });
//
// UserType.hasMany(User);
// User.belongsTo(UserType)
// UserType.sync({force:false});
// module.exports = UserType;