const User = require("./User");
const bcrypt = require('bcryptjs');
const FreeUser = 2;
function createUser(form, callback) {
    var { name, email, nickname, password} = form;
    emailIsValid(email, (emailValidation) => {
        if (!emailValidation) {
           return callback(emailValidation)
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        User.create({
            name: name,
            email: email,
            nickname: nickname,
            password: hash,
            userTypeId: FreeUser
        }).then((user) =>{
           return  callback(user);
        }).catch((err) => {
            return  callback(err);
        })

    })

}

function updateUser(form) {

}
function emailIsValid(email, callback) {
    User.findOne({where: {email: email}}).then(user => {
        if (user === undefined || user === null) {
            callback(true);
        } else {
            callback(false);
        }
    }).catch((err) => {
        callback(false);
    });
}

module.exports = {createUser, updateUser, emailIsValid};
