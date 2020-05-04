const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const { saveTrip, updateTrip, deleteTrip, loadSavedTrips } = require('./db');
const { loginUserAnonymous, logoutCurrentUser } = require('./auth');
const { getGeonamesData } = require('./api');

const PORT = process.env.PORT || 3000;

const app = express();
let appData = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));


app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});



app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});

function callBack(req, res) {
  res.send('POST received');
}

app.post('/add', callBack);




const newTripData = async (req, res) => {
  let user = await loginUserAnonymous();

  const newData = req.body;
  appData.location = newData.location;
  appData.departure = newData.departure;
  appData.return = newData.return;
  appData.attractions = newData.attractions;
  appData.userId = user.id

  console.log('App Data: ', appData)

  saveTrip(appData).then(result => console.log(result)).catch(err => console.log(err));

};

const getSavedTrips = async (req, res) => {
  try {
    let result = await loadSavedTrips();
    res.send(result);
  } catch (err) {
    console.log('error fetching trips: ', err);
  }
}

const getGeoInfo = async (req, res) => {
  const city = req.body
  try {
    const request = await getGeonamesData(city);
    console.log('request: ', request);
  } catch (error) {
    console.log('geo err', err);
  }
}


app.post('/login', loginUserAnonymous);
app.post('/new', newTripData);
app.get('/all', getSavedTrips);
app.post('/geo', getGeoInfo)




