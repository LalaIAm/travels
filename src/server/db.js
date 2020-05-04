const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
} = require('mongodb-stitch-browser-sdk');
const APP_ID = process.env.APP_ID;

const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  'mongodb-atlas'
);

const trips = mongoClient.db('travels').collection('trips');

const loginAnonymous = () => {
  const credential = new AnonymousCredential();
  return app.auth.loginWithCredential(credential);
};

const hasLoggedInUser = () => {
  return app.auth.isLoggedIn;
};

const getCurrentUser = () => {
  return app.auth.isLoggedIn ? app.auth.user : null;
};

const logoutCurrentUser = () => {
  const user = getCurrentUser();
  return app.auth.logoutUserWithId(user.id);
};

module.exports = {
  trips,
  loginAnonymous,
  hasLoggedInUser,
  getCurrentUser,
  logoutCurrentUser,
};
