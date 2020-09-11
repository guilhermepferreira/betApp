const User = require('../users/User');
const Admin = 1;
function isAdmin(user){
    return new Promise((resolve, reject) => {
        if (user.userTypeId === Admin) {
            resolve(true);
        } else {
            reject(false);
        }
    })
}

module.exports = isAdmin;