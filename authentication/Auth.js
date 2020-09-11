const User = require('../users/User');
const bcrypt = require('bcryptjs');
const UserType = require('../users/UserType');
function auth(email, password, callback){
 User.findOne({where:{ email: email}, include: [{model: UserType}]}).then( user => {
     if (user === undefined || user === null){
         return callback({status: 'error', msg: "Usuário não encontrado!", success: false});
     }
     var correct = bcrypt.compareSync(password, user.password);

     if (!correct){
         return callback({status: 'Error', msg: "Informações não encontradas para nenhum usuário!", success: false});
     }
     return callback({user: user, success: true});

 })
}

module.exports = auth;