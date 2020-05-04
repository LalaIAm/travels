const { stitch } = require('./db');
const { AnonymousCredential } = require('mongodb-stitch-server-sdk');


const loginUserAnonymous = () => {
    const credential = new AnonymousCredential();

    return stitch.auth.loginWithCredential(credential)
}


const hasLoggedInUser = () => {
    return stitch.auth.isLoggedIn;
}

const getCurrentUser = () => {
    return stitch.auth.isLoggedIn ? stitch.auth.user : null;
}

const logoutCurrentUser = () => {
    const user = getCurrentUser();
    if (user) {
        return stitch.auth.logoutUserWithId(user.id);
    }
}

module.exports = { loginUserAnonymous, logoutCurrentUser, hasLoggedInUser, getCurrentUser }