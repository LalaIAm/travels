const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const {
  trips,
  loginAnonymous,
  logoutCurrentUser,
  getCurrentUser,
  hasLoggedInUser,
} = require('./db');

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

const saveTravelData = (data) => {
  localStorage.setItem('trip', JSON.stringify(data));
  console.log('Data Saved: ', data);
};

const retrieveData = () => {
  let info = window.localStorage.getItem('trip');
  let data = JSON.parse(info);
  console.log('Retrieved data: ', data);
  return data;
};

const sendData = (req, res) => {
  let data = localStorage.getItem('trip');

  if (data === undefined || data === null) {
    res.send(appData);
    saveTravelData(appData);
  } else {
    res.send(data);
  }
};

const newTripData = async (req, res) => {
  const user = getCurrentUser();
  const newData = req.body;
  appData.location = newData.location;
  appData.departure = newData.departure;
  appData.return = newData.return;
  appData.attractions = newData.attractions;
  appData.owner = user.id;

  const result = await saveTripData(appData);

  console.log('saved: ', result);
};

const saveTripData = async (data) => {
  trips
    .insertOne(data)
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error saving to db: ', error));
};

app.post('/new', newTripData);

app.get('/all', sendData);

module.exports = { client };
