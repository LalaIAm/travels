const geoURL = process.env.GEONAMES_URL
const geoId = process.env.GEONAMES_ID
const weatherAPI = process.env.WEATHERBIT_API
const weatherURL = process.env.WEATHERBIT_URL

const fetch = require('node-fetch');

const getGeonamesData = async (city) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

   try {
        const response = await fetch(`${geoURL}${city}${geoId}`, requestOptions);
        const result = await response.json();
        console.log(result);
        return result;
    }
    catch (error) {
        return console.log('error', error);
    }
}

const getForecast = async (city) => {
    let weather = {}
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    try {
        const response = await fetch(`${weatherURL}${city}${weatherAPI}`, requestOptions);
        const result = await response.json();

        console.log(result);

        weather.temp = result.temp
        return weather;
        
     
    
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getGeonamesData, getForecast };