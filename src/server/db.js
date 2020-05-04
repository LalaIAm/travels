const {
  Stitch,
  RemoteMongoClient,
  BSON
} = require('mongodb-stitch-server-sdk');

const appId = process.env.APP_ID;

const stitch = Stitch.initializeDefaultAppClient(appId);
const mongodb = stitch.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");

const tripsCollection = mongodb.db("travels").collection("trips");

const saveTrip =  async (data) => {
  tripsCollection.insertOne(data).then((result) => {
    console.log('successfully saved trip', result)
  }).catch(error => console.log('error saving trip: ', error));
}

const loadSavedTrips = async () => {
  const trips = await tripsCollection.find({}, { limit: 50 }).asArray();
  return trips;
}

const deleteTrip = async tripId => {
  await tripsCollection.deleteOne({ _id: tripId });
  console.log('successfully deleted trip')
}

const updateTrip = async (trip) => {
  const id = trip.id;
  await (await tripsCollection.updateOne({ _id: id, trip })).then(result => console.log('trip updated'))
    .catch(error => console.log(error)); 
}

module.exports = { saveTrip, deleteTrip, updateTrip, stitch, loadSavedTrips };