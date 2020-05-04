const geoURL = process.env.GEONAMES_URL
const geoId = process.env.GEONAMES_ID

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

module.exports = { getGeonamesData };