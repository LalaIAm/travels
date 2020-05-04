import {
    getGeonamesData
} from './api';

let vacation = {}


const formatData = async (req, res) => {
    const data = req.body;

    vacation[destination] = data.destination;
    vacation[departure] = data.departure;
    vacation[returnDate] = data.return;
    vacation[attractions] = data.attractions;

    const location = vacation.destination;

    const geoData = await getGeonamesData(location);

    console.log('geonames: ',geoData);

}


export default formatData;