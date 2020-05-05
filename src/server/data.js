const {
    getGeonamesData,
    getForecast
} = require('./api')
const fetch = require('node-fetch');

let vacation = {}


const formatData = async (data) => {

    vacation.destination = data.location;
    vacation.departure = data.departure;
    vacation.returnDate = data.return;
    vacation.attractions = data.attractions;
    vacation.owner = data.userId

    const location = vacation.destination;

    const geoData = await getGeonamesData(location);

    console.log('geonames: ', geoData);
    
    const forecast = await getForecast(location);

    console.log('fire', forecast);

}


module.exports = formatData;